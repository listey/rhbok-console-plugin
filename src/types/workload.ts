import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { K8sCondition } from './clusterqueue';

export interface PodSet {
  name: string;
  count: number;
  template: {
    spec: {
      containers: {
        name: string;
        resources?: {
          requests?: Record<string, string>;
          limits?: Record<string, string>;
        };
      }[];
    };
  };
  minCount?: number;
  topologyRequest?: {
    required?: string;
    preferred?: string;
  };
}

export interface PodSetAssignment {
  name: string;
  flavors?: Record<string, string>;
  resourceUsage?: Record<string, string>;
  count?: number;
}

export interface AdmissionCheckState {
  name: string;
  state: string;
  lastTransitionTime?: string;
  message?: string;
  podSetUpdates?: Record<string, unknown>[];
}

export interface WorkloadKind extends K8sResourceCommon {
  spec?: {
    queueName?: string;
    podSets?: PodSet[];
    priorityClassName?: string;
    priorityClassSource?: string;
    priority?: number;
    active?: boolean;
    maximumExecutionTimeSeconds?: number;
  };
  status?: {
    conditions?: K8sCondition[];
    admission?: {
      clusterQueue: string;
      podSetAssignments?: PodSetAssignment[];
    };
    admissionChecks?: AdmissionCheckState[];
    reclaimablePods?: { name: string; count: number }[];
    requeueState?: {
      count?: number;
      requeueAt?: string;
    };
  };
}

export type WorkloadPhase =
  | 'Pending'
  | 'QuotaReserved'
  | 'Admitted'
  | 'Finished'
  | 'Evicted';
