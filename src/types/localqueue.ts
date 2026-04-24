import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { K8sCondition } from './clusterqueue';

export interface LocalQueueKind extends K8sResourceCommon {
  spec?: {
    clusterQueue?: string;
    stopPolicy?: string;
  };
  status?: {
    conditions?: K8sCondition[];
    admittedWorkloads?: number;
    pendingWorkloads?: number;
    reservingWorkloads?: number;
    flavorUsage?: { name: string; resources: { name: string; total: string }[] }[];
    flavorsReservation?: {
      name: string;
      resources: { name: string; total: string }[];
    }[];
  };
}
