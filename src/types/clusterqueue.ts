import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';

export interface FlavorQuota {
  name: string;
  resources: ResourceQuota[];
}

export interface ResourceQuota {
  name: string;
  nominalQuota: string;
  borrowingLimit?: string;
  lendingLimit?: string;
}

export interface ResourceGroup {
  coveredResources: string[];
  flavors: FlavorQuota[];
}

export interface PreemptionPolicy {
  reclaimWithinCohort?: string;
  withinClusterQueue?: string;
  borrowWithinCohort?: Record<string, string>;
}

export interface FairSharing {
  weight?: number;
}

export interface ClusterQueueKind extends K8sResourceCommon {
  spec?: {
    cohort?: string;
    queueingStrategy?: string;
    resourceGroups?: ResourceGroup[];
    preemption?: PreemptionPolicy;
    fairSharing?: FairSharing;
    stopPolicy?: string;
    admissionChecks?: string[];
    admissionCheckStrategy?: {
      admissionChecks?: { name: string; onFlavors?: string[] }[];
    };
  };
  status?: {
    conditions?: K8sCondition[];
    admittedWorkloads?: number;
    pendingWorkloads?: number;
    reservingWorkloads?: number;
    flavorsReservation?: FlavorUsage[];
    flavorsUsage?: FlavorUsage[];
    fairSharing?: {
      weightedShare?: number;
    };
  };
}

export interface FlavorUsage {
  name: string;
  resources: { name: string; total: string; borrowed?: string }[];
}

export interface K8sCondition {
  type: string;
  status: string;
  reason?: string;
  message?: string;
  lastTransitionTime?: string;
}
