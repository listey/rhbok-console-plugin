import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { K8sCondition } from './clusterqueue';

export interface KueueKind extends K8sResourceCommon {
  spec?: {
    managementState?: string;
    config?: {
      integrations?: {
        frameworks?: string[];
      };
      preemption?: {
        preemptionPolicy?: string;
      };
      workloadManagement?: {
        labelPolicy?: string;
      };
    };
  };
  status?: {
    conditions?: K8sCondition[];
  };
}
