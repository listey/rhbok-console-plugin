import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';

export interface WorkloadPriorityClassKind extends K8sResourceCommon {
  value: number;
  description?: string;
}
