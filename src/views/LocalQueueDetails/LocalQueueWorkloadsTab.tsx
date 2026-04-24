import {
  ResourceLink,
  RowProps,
  TableColumn,
  TableData,
  Timestamp,
  useK8sWatchResource,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';
import { PageSection } from '@patternfly/react-core';
import { LocalQueueKind, WorkloadKind } from '../../types';
import { WorkloadGroupVersionKind } from '../../models';
import { getWorkloadPhase } from '../../utils/status';
import { WorkloadPhaseBadge } from '../../components/shared/StatusBadge';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<WorkloadKind>[] = [
  { title: 'Name', id: 'name' },
  { title: 'Phase', id: 'phase' },
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
    <TableData id="phase" activeColumnIDs={activeColumnIDs}>
      <WorkloadPhaseBadge phase={getWorkloadPhase(obj)} />
    </TableData>
    <TableData id="priority" activeColumnIDs={activeColumnIDs}>
      {obj.spec?.priority ?? '—'}
    </TableData>
    <TableData id="created" activeColumnIDs={activeColumnIDs}>
      <Timestamp timestamp={obj.metadata?.creationTimestamp} />
    </TableData>
  </>
);

export default function LocalQueueWorkloadsTab({ obj }: { obj: LocalQueueKind }) {
  const { t } = useKueueTranslation();
  const [allWorkloads, loaded, loadError] = useK8sWatchResource<WorkloadKind[]>({
    groupVersionKind: WorkloadGroupVersionKind,
    isList: true,
    namespace: obj.metadata?.namespace,
    namespaced: true,
  });

  const filtered = (allWorkloads || []).filter(
    (wl) => wl.spec?.queueName === obj.metadata?.name,
  );

  return (
    <PageSection>
      <VirtualizedTable<WorkloadKind>
        data={filtered}
        unfilteredData={filtered}
        loaded={loaded}
        loadError={loadError}
        columns={columns}
        Row={WorkloadRow}
        aria-label={t('Workloads in this queue')}
      />
    </PageSection>
  );
}
