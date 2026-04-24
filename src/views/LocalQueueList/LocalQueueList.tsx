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
import { LocalQueueKind } from '../../types';
import { LocalQueueGroupVersionKind, ClusterQueueGroupVersionKind } from '../../models';
import { isResourceActive } from '../../utils/status';
import { ActiveStatusBadge } from '../../components/shared/StatusBadge';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<LocalQueueKind>[] = [
  { title: 'Name', id: 'name', sort: 'metadata.name' },
  { title: 'Namespace', id: 'namespace', sort: 'metadata.namespace' },
  { title: 'Status', id: 'status' },
  { title: 'ClusterQueue', id: 'clusterqueue', sort: 'spec.clusterQueue' },
  { title: 'Pending', id: 'pending', sort: 'status.pendingWorkloads' },
  { title: 'Admitted', id: 'admitted', sort: 'status.admittedWorkloads' },
  { title: 'Created', id: 'created', sort: 'metadata.creationTimestamp' },
];

const LocalQueueRow: React.FC<RowProps<LocalQueueKind>> = ({ obj, activeColumnIDs }) => {
  return (
    <>
      <TableData id="name" activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={LocalQueueGroupVersionKind}
          name={obj.metadata?.name}
          namespace={obj.metadata?.namespace}
        />
      </TableData>
      <TableData id="namespace" activeColumnIDs={activeColumnIDs}>
        <ResourceLink kind="Namespace" name={obj.metadata?.namespace} />
      </TableData>
      <TableData id="status" activeColumnIDs={activeColumnIDs}>
        <ActiveStatusBadge active={isResourceActive(obj)} />
      </TableData>
      <TableData id="clusterqueue" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.clusterQueue ? (
          <ResourceLink
            groupVersionKind={ClusterQueueGroupVersionKind}
            name={obj.spec.clusterQueue}
          />
        ) : (
          '—'
        )}
      </TableData>
      <TableData id="pending" activeColumnIDs={activeColumnIDs}>
        {obj.status?.pendingWorkloads ?? 0}
      </TableData>
      <TableData id="admitted" activeColumnIDs={activeColumnIDs}>
        {obj.status?.admittedWorkloads ?? 0}
      </TableData>
      <TableData id="created" activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata?.creationTimestamp} />
      </TableData>
    </>
  );
};

const statusFilters: RowFilter<LocalQueueKind>[] = [
  {
    filterGroupName: 'Status',
    type: 'local-queue-status',
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

export default function LocalQueueList() {
  const { t } = useKueueTranslation();
  const [activeNamespace] = useActiveNamespace();
  const [resources, loaded, loadError] = useK8sWatchResource<LocalQueueKind[]>({
    groupVersionKind: LocalQueueGroupVersionKind,
    isList: true,
    namespace: activeNamespace,
    namespaced: true,
  });

  const [data, filteredData, onFilterChange] = useListPageFilter(resources, statusFilters);

  return (
    <>
      <ListPageHeader title={t('LocalQueues')}>
        <ListPageCreate groupVersionKind={LocalQueueGroupVersionKind}>
          {t('Create LocalQueue')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter
          data={data}
          loaded={loaded}
          rowFilters={statusFilters}
          onFilterChange={onFilterChange}
        />
        <VirtualizedTable<LocalQueueKind>
          data={filteredData}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
          columns={columns}
          Row={LocalQueueRow}
        />
      </ListPageBody>
    </>
  );
}
