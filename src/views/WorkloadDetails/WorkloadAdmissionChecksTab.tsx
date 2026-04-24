import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import { Label } from '@patternfly/react-core';
import { PageSection } from '@patternfly/react-core';
import { Timestamp } from '@openshift-console/dynamic-plugin-sdk';
import { CheckCircleIcon, ClockIcon, SyncAltIcon } from '@patternfly/react-icons';
import { WorkloadKind } from '../../types';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const stateConfig: Record<string, { color: React.ComponentProps<typeof Label>['color']; icon: React.ReactNode }> = {
  Ready: { color: 'green', icon: <CheckCircleIcon /> },
  Pending: { color: 'yellow', icon: <ClockIcon /> },
  Retry: { color: 'blue', icon: <SyncAltIcon /> },
};

export default function WorkloadAdmissionChecksTab({ obj }: { obj: WorkloadKind }) {
  const { t } = useKueueTranslation();
  const checks = obj.status?.admissionChecks;

  if (!checks?.length) {
    return <PageSection>{t('No admission checks')}</PageSection>;
  }

  return (
    <PageSection>
      <Table aria-label={t('Admission checks')} variant="compact">
        <Thead>
          <Tr>
            <Th>{t('Name')}</Th>
            <Th>{t('State')}</Th>
            <Th>{t('Message')}</Th>
            <Th>{t('Last transition')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {checks.map((check) => {
            const config = stateConfig[check.state] ?? stateConfig.Pending;
            return (
              <Tr key={check.name}>
                <Td>{check.name}</Td>
                <Td>
                  <Label color={config.color} icon={config.icon} isCompact>
                    {check.state}
                  </Label>
                </Td>
                <Td>{check.message ?? '—'}</Td>
                <Td>
                  {check.lastTransitionTime ? (
                    <Timestamp timestamp={check.lastTransitionTime} />
                  ) : (
                    '—'
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </PageSection>
  );
}
