import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { K8sCondition, ResourceGroup, FairSharing } from './clusterqueue';

export interface CohortKind extends K8sResourceCommon {
  spec?: {
    parent?: string;
    resourceGroups?: ResourceGroup[];
    fairSharing?: FairSharing;
  };
  status?: {
    conditions?: K8sCondition[];
    fairSharing?: {
      weightedShare?: number;
    };
  };
}
