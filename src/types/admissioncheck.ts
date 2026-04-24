import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { K8sCondition } from './clusterqueue';

export interface AdmissionCheckKind extends K8sResourceCommon {
  spec?: {
    controllerName?: string;
    retryDelayMinutes?: number;
    parameters?: {
      apiGroup: string;
      kind: string;
      name: string;
    };
  };
  status?: {
    conditions?: K8sCondition[];
  };
}
