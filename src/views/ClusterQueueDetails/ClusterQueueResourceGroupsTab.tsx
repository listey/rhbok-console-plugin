import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import { PageSection, Title } from '@patternfly/react-core';
import { ResourceLink } from '@openshift-console/dynamic-plugin-sdk';
import { ClusterQueueKind, ResourceGroup } from '../../types';
import { ResourceFlavorGroupVersionKind } from '../../models';
import { QuotaBar } from '../../components/shared/QuotaBar';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const ResourceGroupTable: React.FC<{ group: ResourceGroup; index: number }> = ({
  group,
  index,
}) => {
  const { t } = useKueueTranslation();
  return (
    <div style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
      <Title headingLevel="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
        {t('Resource Group {{index}}: {{resources}}', {
          index: index + 1,
          resources: group.coveredResources.join(', '),
        })}
      </Title>
      <Table aria-label={t('Resource group {{index}}', { index: index + 1 })} variant="compact">
        <Thead>
          <Tr>
            <Th>{t('Flavor')}</Th>
            <Th>{t('Resource')}</Th>
            <Th>{t('Nominal')}</Th>
            <Th>{t('Borrowing Limit')}</Th>
            <Th>{t('Lending Limit')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {group.flavors?.map((flavor) =>
            flavor.resources?.map((resource, ri) => (
              <Tr key={`${flavor.name}-${resource.name}`}>
                {ri === 0 ? (
                  <Td rowSpan={flavor.resources.length}>
                    <ResourceLink
                      groupVersionKind={ResourceFlavorGroupVersionKind}
                      name={flavor.name}
                    />
                  </Td>
                ) : null}
                <Td>{resource.name}</Td>
                <Td>{resource.nominalQuota}</Td>
                <Td>{resource.borrowingLimit ?? '—'}</Td>
                <Td>{resource.lendingLimit ?? '—'}</Td>
              </Tr>
            )),
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default function ClusterQueueResourceGroupsTab({
  obj,
}: {
  obj: ClusterQueueKind;
}) {
  const { t } = useKueueTranslation();
  const resourceGroups = obj.spec?.resourceGroups;
  const usageByResource = new Map<string, { used: string; nominal: string; borrowed?: string }>();

  obj.status?.flavorsUsage?.forEach((flavor) => {
    flavor.resources?.forEach((r) => {
      const existing = usageByResource.get(r.name);
      if (existing) {
        usageByResource.set(r.name, {
          used: String(parseFloat(existing.used) + parseFloat(r.total)),
          nominal: existing.nominal,
          borrowed: r.borrowed || existing.borrowed,
        });
      } else {
        let nominal = '0';
        obj.spec?.resourceGroups?.forEach((rg) => {
          rg.flavors?.forEach((f) => {
            if (f.name === flavor.name) {
              const rr = f.resources?.find((res) => res.name === r.name);
              if (rr) {
                nominal = String(parseFloat(nominal) + parseFloat(rr.nominalQuota));
              }
            }
          });
        });
        usageByResource.set(r.name, { used: r.total, nominal, borrowed: r.borrowed });
      }
    });
  });

  return (
    <PageSection>
      {!resourceGroups?.length ? (
        <>{t('No resource groups defined')}</>
      ) : (
        <>
          {resourceGroups.map((group, i) => (
            <ResourceGroupTable key={i} group={group} index={i} />
          ))}
          {usageByResource.size > 0 && (
            <>
              <Title headingLevel="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                {t('Quota Usage')}
              </Title>
              {Array.from(usageByResource.entries()).map(([name, usage]) => (
                <QuotaBar
                  key={name}
                  resourceName={name}
                  used={usage.used}
                  nominal={usage.nominal}
                  borrowed={usage.borrowed}
                />
              ))}
            </>
          )}
        </>
      )}
    </PageSection>
  );
}
