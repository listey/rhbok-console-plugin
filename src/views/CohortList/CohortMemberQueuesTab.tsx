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
import { ClusterQueueKind, CohortKind } from '../../types';
import { ClusterQueueGroupVersionKind } from '../../models';
import { isResourceActive } from '../../utils/status';
import { ActiveStatusBadge } from '../../components/shared/StatusBadge';
import { useKueueTranslation } from '../../utils/hooks/useKueueTranslation';

const columns: TableColumn<ClusterQueueKind>[] = [
  { title: 'Name', id: 'name' },
  { title: 'Status', id: 'status' },
  { title: 'Pending', id: 'pending' },
  { title: 'Admitted', id: 'admitted' },
  { title: 'Created', id: 'created' },
];

const MemberRow: React.FC<RowProps<ClusterQueueKind>> = ({ obj, activeColumnIDs }) => (
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

export default function CohortMemberQueuesTab({ obj }: { obj: CohortKind }) {
  const { t } = useKueueTranslation();
  const [allQueues, loaded, loadError] = useK8sWatchResource<ClusterQueueKind[]>({
    groupVersionKind: ClusterQueueGroupVersionKind,
    isList: true,
  });

  const members = (allQueues || []).filter(
    (cq) => cq.spec?.cohort === obj.metadata?.name,
  );

  return (
    <PageSection>
      <VirtualizedTable<ClusterQueueKind>
        data={members}
        unfilteredData={members}
        loaded={loaded}
        loadError={loadError}
        columns={columns}
        Row={MemberRow}
        aria-label={t('Member ClusterQueues')}
      />
    </PageSection>
  );
}
