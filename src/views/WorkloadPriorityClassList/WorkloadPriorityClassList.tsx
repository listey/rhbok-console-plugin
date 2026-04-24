import {
  ListPageBody,
  ListPageCreate,
  ListPageFilter,
  ListPageHeader,
  ResourceLink,
  RowProps,
  TableColumn,
  TableData,
  Timestamp,
  useK8sWatchResource,
  useListPageFilter,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';
import { WorkloadPriorityClassKind } from '../../types';
import { WorkloadPriorityClassGroupVersionKind } from '../../models';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<WorkloadPriorityClassKind>[] = [
  { title: 'Name', id: 'name', sort: 'metadata.name' },
  { title: 'Value', id: 'value', sort: 'value' },
  { title: 'Description', id: 'description' },
  { title: 'Created', id: 'created', sort: 'metadata.creationTimestamp' },
];

const WPCRow: React.FC<RowProps<WorkloadPriorityClassKind>> = ({ obj, activeColumnIDs }) => {
  return (
    <>
      <TableData id="name" activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={WorkloadPriorityClassGroupVersionKind}
          name={obj.metadata?.name}
        />
      </TableData>
      <TableData id="value" activeColumnIDs={activeColumnIDs}>
        {obj.value}
      </TableData>
      <TableData id="description" activeColumnIDs={activeColumnIDs}>
        {obj.description ?? '—'}
      </TableData>
      <TableData id="created" activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata?.creationTimestamp} />
      </TableData>
    </>
  );
};

export default function WorkloadPriorityClassList() {
  const { t } = useKueueTranslation();
  const [resources, loaded, loadError] = useK8sWatchResource<WorkloadPriorityClassKind[]>({
    groupVersionKind: WorkloadPriorityClassGroupVersionKind,
    isList: true,
  });

  const [data, filteredData, onFilterChange] = useListPageFilter(resources);

  return (
    <>
      <ListPageHeader title={t('WorkloadPriorityClasses')}>
        <ListPageCreate groupVersionKind={WorkloadPriorityClassGroupVersionKind}>
          {t('Create WorkloadPriorityClass')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter data={data} loaded={loaded} onFilterChange={onFilterChange} />
        <VirtualizedTable<WorkloadPriorityClassKind>
          data={filteredData}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
          columns={columns}
          Row={WPCRow}
        />
      </ListPageBody>
    </>
  );
}
