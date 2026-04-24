import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import { GreenCheckCircleIcon, RedExclamationCircleIcon, Timestamp } from '@openshift-console/dynamic-plugin-sdk';
import { K8sCondition } from '../../types';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

export const ConditionsTable: React.FC<{ conditions?: K8sCondition[] }> = ({ conditions }) => {
  const { t } = useKueueTranslation();

  if (!conditions?.length) {
    return <>{t('No conditions')}</>;
  }

  return (
    <Table aria-label={t('Conditions')} variant="compact">
      <Thead>
        <Tr>
          <Th>{t('Type')}</Th>
          <Th>{t('Status')}</Th>
          <Th>{t('Reason')}</Th>
          <Th>{t('Message')}</Th>
          <Th>{t('Last transition')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {conditions.map((c) => (
          <Tr key={c.type}>
            <Td>{c.type}</Td>
            <Td>
              {c.status === 'True' ? (
                <GreenCheckCircleIcon title={t('True')} />
              ) : (
                <RedExclamationCircleIcon title={t('False')} />
              )}{' '}
              {c.status}
            </Td>
            <Td>{c.reason ?? '—'}</Td>
            <Td>{c.message ?? '—'}</Td>
            <Td>
              {c.lastTransitionTime ? (
                <Timestamp timestamp={c.lastTransitionTime} />
              ) : (
                '—'
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ConditionsTable;
