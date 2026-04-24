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
  useK8sWatchResource,
  useListPageFilter,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';
import { ClusterQueueKind } from '../../types';
import { ClusterQueueGroupVersionKind } from '../../models';
import { isResourceActive } from '../../utils/status';
import { ActiveStatusBadge } from '../../components/shared/StatusBadge';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<ClusterQueueKind>[] = [
  { title: 'Name', id: 'name', sort: 'metadata.name' },
  { title: 'Status', id: 'status' },
  { title: 'Cohort', id: 'cohort', sort: 'spec.cohort' },
  { title: 'Pending', id: 'pending', sort: 'status.pendingWorkloads' },
  { title: 'Admitted', id: 'admitted', sort: 'status.admittedWorkloads' },
  { title: 'Strategy', id: 'strategy', sort: 'spec.queueingStrategy' },
  { title: 'Created', id: 'created', sort: 'metadata.creationTimestamp' },
];

const ClusterQueueRow: React.FC<RowProps<ClusterQueueKind>> = ({ obj, activeColumnIDs }) => {
  return (
    <>
      <TableData id="name" activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={ClusterQueueGroupVersionKind}
          name={obj.metadata?.name}
        />
      </TableData>
      <TableData id="status" activeColumnIDs={activeColumnIDs}>
        <ActiveStatusBadge active={isResourceActive(obj)} />
      </TableData>
      <TableData id="cohort" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.cohort ?? '—'}
      </TableData>
      <TableData id="pending" activeColumnIDs={activeColumnIDs}>
        {obj.status?.pendingWorkloads ?? 0}
      </TableData>
      <TableData id="admitted" activeColumnIDs={activeColumnIDs}>
        {obj.status?.admittedWorkloads ?? 0}
      </TableData>
      <TableData id="strategy" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.queueingStrategy ?? 'BestEffortFIFO'}
      </TableData>
      <TableData id="created" activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata?.creationTimestamp} />
      </TableData>
    </>
  );
};

const statusFilters: RowFilter<ClusterQueueKind>[] = [
  {
    filterGroupName: 'Status',
    type: 'cluster-queue-status',
    items: [
      { id: 'Active', title: 'Active' },
      { id: 'Inactive', title: 'Inactive' },
    ],
    reducer: (obj) => (isResourceActive(obj) ? 'Active' : 'Inactive'),
    filter: (input, obj) => {
      if (!input.selected?.length) return true;
      const status = isResourceActive(obj) ? 'Active' : 'Inactive';
      return input.selected.includes(status);
    },
  },
];

export default function ClusterQueueList() {
  const { t } = useKueueTranslation();
  const [resources, loaded, loadError] = useK8sWatchResource<ClusterQueueKind[]>({
    groupVersionKind: ClusterQueueGroupVersionKind,
    isList: true,
  });

  const [data, filteredData, onFilterChange] = useListPageFilter(resources, statusFilters);

  return (
    <>
      <ListPageHeader title={t('ClusterQueues')}>
        <ListPageCreate groupVersionKind={ClusterQueueGroupVersionKind}>
          {t('Create ClusterQueue')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter
          data={data}
          loaded={loaded}
          rowFilters={statusFilters}
          onFilterChange={onFilterChange}
        />
        <VirtualizedTable<ClusterQueueKind>
          data={filteredData}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
          columns={columns}
          Row={ClusterQueueRow}
        />
      </ListPageBody>
    </>
  );
}
