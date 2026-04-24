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
import { WorkloadKind } from '../../types';
import { ResourceFlavorGroupVersionKind } from '../../models';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

export default function WorkloadPodSetsTab({ obj }: { obj: WorkloadKind }) {
  const { t } = useKueueTranslation();
  const podSets = obj.spec?.podSets;
  const assignments = obj.status?.admission?.podSetAssignments;

  if (!podSets?.length) {
    return <PageSection>{t('No pod sets defined')}</PageSection>;
  }

  return (
    <PageSection>
      {podSets.map((ps) => {
        const assignment = assignments?.find((a) => a.name === ps.name);
        const allRequests: Record<string, string> = {};
        ps.template?.spec?.containers?.forEach((c) => {
          Object.entries(c.resources?.requests ?? {}).forEach(([k, v]) => {
            allRequests[k] = v;
          });
        });

        return (
          <div key={ps.name} style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
            <Title headingLevel="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
              {t('Pod Set: {{name}}', { name: ps.name })}
              <span style={{ fontWeight: 'normal', marginLeft: 'var(--pf-t--global--spacer--md)' }}>
                {t('Count: {{count}}', { count: ps.count })}
              </span>
            </Title>
            <Table aria-label={t('Pod set {{name}}', { name: ps.name })} variant="compact">
              <Thead>
                <Tr>
                  <Th>{t('Resource')}</Th>
                  <Th>{t('Request')}</Th>
                  <Th>{t('Assigned Flavor')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(allRequests).map(([resource, request]) => (
                  <Tr key={resource}>
                    <Td>{resource}</Td>
                    <Td>{request}</Td>
                    <Td>
                      {assignment?.flavors?.[resource] ? (
                        <ResourceLink
                          groupVersionKind={ResourceFlavorGroupVersionKind}
                          name={assignment.flavors[resource]}
                        />
                      ) : (
                        '—'
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        );
      })}
    </PageSection>
  );
}
