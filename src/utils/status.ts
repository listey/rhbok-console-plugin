import { K8sCondition } from '../types';
import { WorkloadKind, WorkloadPhase } from '../types/workload';

export function getCondition(
  conditions: K8sCondition[] | undefined,
  type: string,
): K8sCondition | undefined {
  return conditions?.find((c) => c.type === type);
}

export function isConditionTrue(
  conditions: K8sCondition[] | undefined,
  type: string,
): boolean {
  return getCondition(conditions, type)?.status === 'True';
}

export function isResourceActive(resource: {
  status?: { conditions?: K8sCondition[] };
}): boolean {
  return isConditionTrue(resource?.status?.conditions, 'Active');
}

export function getWorkloadPhase(workload: WorkloadKind): WorkloadPhase {
  const conditions = workload?.status?.conditions;
  if (isConditionTrue(conditions, 'Finished')) return 'Finished';
  if (isConditionTrue(conditions, 'Evicted')) return 'Evicted';
  if (isConditionTrue(conditions, 'Admitted')) return 'Admitted';
  if (isConditionTrue(conditions, 'QuotaReserved')) return 'QuotaReserved';
  return 'Pending';
}
