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
import { AdmissionCheckKind } from '../../types';
import { AdmissionCheckGroupVersionKind } from '../../models';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<AdmissionCheckKind>[] = [
  { title: 'Name', id: 'name', sort: 'metadata.name' },
  { title: 'Controller Name', id: 'controller', sort: 'spec.controllerName' },
  { title: 'Parameters', id: 'parameters' },
  { title: 'Created', id: 'created', sort: 'metadata.creationTimestamp' },
];

const AdmissionCheckRow: React.FC<RowProps<AdmissionCheckKind>> = ({ obj, activeColumnIDs }) => {
  const params = obj.spec?.parameters;
  return (
    <>
      <TableData id="name" activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={AdmissionCheckGroupVersionKind}
          name={obj.metadata?.name}
        />
      </TableData>
      <TableData id="controller" activeColumnIDs={activeColumnIDs}>
        {obj.spec?.controllerName ?? '—'}
      </TableData>
      <TableData id="parameters" activeColumnIDs={activeColumnIDs}>
        {params ? `${params.kind}/${params.name}` : '—'}
      </TableData>
      <TableData id="created" activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata?.creationTimestamp} />
      </TableData>
    </>
  );
};

export default function AdmissionCheckList() {
  const { t } = useKueueTranslation();
  const [resources, loaded, loadError] = useK8sWatchResource<AdmissionCheckKind[]>({
    groupVersionKind: AdmissionCheckGroupVersionKind,
    isList: true,
  });

  const [data, filteredData, onFilterChange] = useListPageFilter(resources);

  return (
    <>
      <ListPageHeader title={t('AdmissionChecks')}>
        <ListPageCreate groupVersionKind={AdmissionCheckGroupVersionKind}>
          {t('Create AdmissionCheck')}
        </ListPageCreate>
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter data={data} loaded={loaded} onFilterChange={onFilterChange} />
        <VirtualizedTable<AdmissionCheckKind>
          data={filteredData}
          unfilteredData={resources}
          loaded={loaded}
          loadError={loadError}
          columns={columns}
          Row={AdmissionCheckRow}
        />
      </ListPageBody>
    </>
  );
}
