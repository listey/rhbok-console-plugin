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
import { CohortKind } from '../../types';
import { CohortGroupVersionKind } from '../../models';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<CohortKind>[] = [
  { title: 'Name', id: 'name', sort: 'metadata.name' },
  { title: 'Parent', id: 'parent', sort: 'spec.parent' },
  { title: 'Resource Groups', id: 'resourceGroups' },
  { title: 'Fair Sharing Weight', id: 'fairSharing' },
  { title: 'Created', id: 'created', sort: 'metadata.creationTimestamp' },
];

const CohortRow: React.FC<RowProps<CohortKind>> = ({ obj, activeColumnIDs }) => {
  return (
    <>
      <TableData id="name" activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={CohortGroupVersionKind}
          name={obj.metadata?.name}
        />
      </TableData>
      <TableData id="parent" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.parent ? (
          <ResourceLink
            groupVersionKind={CohortGroupVersionKind}
            name={obj.spec.parent}
          />
        ) : (
          '—'
        )}
      </TableData>
      <TableData id="resourceGroups" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.resourceGroups?.length ?? 0}
      </TableData>
      <TableData id="fairSharing" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.fairSharing?.weight ?? '—'}
      </TableData>
      <TableData id="created" activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata?.creationTimestamp} />
      </TableData>
    </>
  );
};

export default function CohortList() {
  const { t } = useKueueTranslation();
  const [resources, loaded, loadError] = useK8sWatchResource<CohortKind[]>({
    groupVersionKind: CohortGroupVersionKind,
    isList: true,
  });

  const [data, filteredData, onFilterChange] = useListPageFilter(resources);

  return (
    <>
      <ListPageHeader title={t('Cohorts')}>
        <ListPageCreate groupVersionKind={CohortGroupVersionKind}>
          {t('Create Cohort')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter data={data} loaded={loaded} onFilterChange={onFilterChange} />
        <VirtualizedTable<CohortKind>
          data={filteredData}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
          columns={columns}
          Row={CohortRow}
        />
      </ListPageBody>
    </>
  );
}
