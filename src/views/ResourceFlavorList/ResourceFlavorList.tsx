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
import { ResourceFlavorKind } from '../../types';
import { ResourceFlavorGroupVersionKind } from '../../models';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<ResourceFlavorKind>[] = [
  { title: 'Name', id: 'name', sort: 'metadata.name' },
  { title: 'Node Labels', id: 'labels' },
  { title: 'Topology', id: 'topology', sort: 'spec.topologyName' },
  { title: 'Created', id: 'created', sort: 'metadata.creationTimestamp' },
];

const ResourceFlavorRow: React.FC<RowProps<ResourceFlavorKind>> = ({ obj, activeColumnIDs }) => {
  const labels = obj.spec?.nodeLabels;
  const labelSummary = labels
    ? Object.entries(labels)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ')
    : '—';

  return (
    <>
      <TableData id="name" activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={ResourceFlavorGroupVersionKind}
          name={obj.metadata?.name}
        />
      </TableData>
      <TableData id="labels" activeColumnIDs={activeColumnIDs}>
        {labelSummary}
      </TableData>
      <TableData id="topology" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.topologyName ?? '—'}
      </TableData>
      <TableData id="created" activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata?.creationTimestamp} />
      </TableData>
    </>
  );
};

export default function ResourceFlavorList() {
  const { t } = useKueueTranslation();
  const [resources, loaded, loadError] = useK8sWatchResource<ResourceFlavorKind[]>({
    groupVersionKind: ResourceFlavorGroupVersionKind,
    isList: true,
  });

  const [data, filteredData, onFilterChange] = useListPageFilter(resources);

  return (
    <>
      <ListPageHeader title={t('ResourceFlavors')}>
        <ListPageCreate groupVersionKind={ResourceFlavorGroupVersionKind}>
          {t('Create ResourceFlavor')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter data={data} loaded={loaded} onFilterChange={onFilterChange} />
        <VirtualizedTable<ResourceFlavorKind>
          data={filteredData}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
          columns={columns}
          Row={ResourceFlavorRow}
        />
      </ListPageBody>
    </>
  );
}
