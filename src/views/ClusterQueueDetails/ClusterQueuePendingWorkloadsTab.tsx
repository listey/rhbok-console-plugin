import {
  ResourceLink,
  TableColumn,
  TableData,
  Timestamp,
  useK8sWatchResource,
  VirtualizedTable,
  RowProps,
} from '@openshift-console/dynamic-plugin-sdk';
import { PageSection } from '@patternfly/react-core';
import { ClusterQueueKind, WorkloadKind } from '../../types';
import { WorkloadGroupVersionKind } from '../../models';
import { getWorkloadPhase } from '../../utils/status';
import { WorkloadPhaseBadge } from '../../components/shared/StatusBadge';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<WorkloadKind>[] = [
  { title: 'Name', id: 'name' },
  { title: 'Namespace', id: 'namespace' },
  { title: 'Phase', id: 'phase' },
  { title: 'Queue', id: 'queue' },
  { title: 'Priority', id: 'priority' },
  { title: 'Created', id: 'created' },
];

const WorkloadRow: React.FC<RowProps<WorkloadKind>> = ({ obj, activeColumnIDs }) => (
  <>
    <TableData id="name" activeColumnIDs={activeColumnIDs}>
      <ResourceLink
        groupVersionKind={WorkloadGroupVersionKind}
        name={obj.metadata?.name}
        namespace={obj.metadata?.namespace}
      />
    </TableData>
    <TableData id="namespace" activeColumnIDs={activeColumnIDs}>
      {obj.metadata?.namespace}
    </TableData>
    <TableData id="phase" activeColumnIDs={activeColumnIDs}>
      <WorkloadPhaseBadge phase={getWorkloadPhase(obj)} />
    </TableData>
    <TableData id="queue" activeColumnIDs={activeColumnIDs}>
      {obj.spec?.queueName ?? '—'}
    </TableData>
    <TableData id="priority" activeColumnIDs={activeColumnIDs}>
      {obj.spec?.priority ?? '—'}
    </TableData>
    <TableData id="created" activeColumnIDs={activeColumnIDs}>
      <Timestamp timestamp={obj.metadata?.creationTimestamp} />
    </TableData>
  </>
);

export default function ClusterQueuePendingWorkloadsTab({
  obj,
}: {
  obj: ClusterQueueKind;
}) {
  const { t } = useKueueTranslation();
  const [allWorkloads, loaded, loadError] = useK8sWatchResource<WorkloadKind[]>({
    groupVersionKind: WorkloadGroupVersionKind,
    isList: true,
    namespaced: true,
  });

  const pendingWorkloads = (allWorkloads || []).filter((wl) => {
    const phase = getWorkloadPhase(wl);
    const admittedTo = wl.status?.admission?.clusterQueue;
    return (
      (phase === 'Pending' || phase === 'QuotaReserved') &&
      (admittedTo === obj.metadata?.name || wl.spec?.queueName)
    );
  });

  return (
    <PageSection>
      <VirtualizedTable<WorkloadKind>
        data={pendingWorkloads}
        unfilteredData={pendingWorkloads}
        loaded={loaded}
        loadError={loadError}
        columns={columns}
        Row={WorkloadRow}
        aria-label={t('Pending workloads')}
      />
    </PageSection>
  );
}
