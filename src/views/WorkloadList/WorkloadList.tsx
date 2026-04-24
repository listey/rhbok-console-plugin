import {
  ListPageBody,
  ListPageCreate,
  ListPageFilter,
  ListPageHeader,
  ResourceLink,
  RowFilter,
  RowProps,
  TableColumn,
  TableData,
  Timestamp,
  useActiveNamespace,
  useK8sWatchResource,
  useListPageFilter,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';
import { WorkloadKind, WorkloadPhase } from '../../types';
import { WorkloadGroupVersionKind, LocalQueueGroupVersionKind } from '../../models';
import { getWorkloadPhase } from '../../utils/status';
import { WorkloadPhaseBadge } from '../../components/shared/StatusBadge';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<WorkloadKind>[] = [
  { title: 'Name', id: 'name', sort: 'metadata.name' },
  { title: 'Namespace', id: 'namespace', sort: 'metadata.namespace' },
  { title: 'Phase', id: 'phase' },
  { title: 'Queue', id: 'queue', sort: 'spec.queueName' },
  { title: 'Priority', id: 'priority', sort: 'spec.priority' },
  { title: 'Created', id: 'created', sort: 'metadata.creationTimestamp' },
];

const WorkloadRow: React.FC<RowProps<WorkloadKind>> = ({ obj, activeColumnIDs }) => {
  const phase = getWorkloadPhase(obj);
  return (
    <>
      <TableData id="name" activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={WorkloadGroupVersionKind}
          name={obj.metadata?.name}
          namespace={obj.metadata?.namespace}
        />
      </TableData>
      <TableData id="namespace" activeColumnIDs={activeColumnIDs}>
        <ResourceLink kind="Namespace" name={obj.metadata?.namespace} />
      </TableData>
      <TableData id="phase" activeColumnIDs={activeColumnIDs}>
        <WorkloadPhaseBadge phase={phase} />
      </TableData>
      <TableData id="queue" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.queueName ? (
          <ResourceLink
            groupVersionKind={LocalQueueGroupVersionKind}
            name={obj.spec.queueName}
            namespace={obj.metadata?.namespace}
          />
        ) : (
          '—'
        )}
      </TableData>
      <TableData id="priority" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.priority ?? '—'}
      </TableData>
      <TableData id="created" activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata?.creationTimestamp} />
      </TableData>
    </>
  );
};

const phaseValues: WorkloadPhase[] = ['Pending', 'QuotaReserved', 'Admitted', 'Finished', 'Evicted'];

const statusFilters: RowFilter<WorkloadKind>[] = [
  {
    filterGroupName: 'Phase',
    type: 'workload-phase',
    items: phaseValues.map((p) => ({ id: p, title: p })),
    reducer: (obj) => getWorkloadPhase(obj),
    filter: (input, obj) => {
      if (!input.selected?.length) return true;
      return input.selected.includes(getWorkloadPhase(obj));
    },
  },
];

export default function WorkloadList() {
  const { t } = useKueueTranslation();
  const [activeNamespace] = useActiveNamespace();
  const [resources, loaded, loadError] = useK8sWatchResource<WorkloadKind[]>({
    groupVersionKind: WorkloadGroupVersionKind,
    isList: true,
    namespace: activeNamespace,
    namespaced: true,
  });

  const [data, filteredData, onFilterChange] = useListPageFilter(resources, statusFilters);

  return (
    <>
      <ListPageHeader title={t('Workloads')}>
        <ListPageCreate groupVersionKind={WorkloadGroupVersionKind}>
          {t('Create Workload')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter
          data={data}
          loaded={loaded}
          rowFilters={statusFilters}
          onFilterChange={onFilterChange}
        />
        <VirtualizedTable<WorkloadKind>
          data={filteredData}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
          columns={columns}
          Row={WorkloadRow}
        />
      </ListPageBody>
    </>
  );
}
