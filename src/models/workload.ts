import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const WorkloadModel: K8sModel = {
  apiGroup: KUEUE_API_GROUP,
  apiVersion: KUEUE_API_VERSION,
  kind: 'Workload',
  plural: 'workloads',
  abbr: 'WL',
  label: 'Workload',
  labelPlural: 'Workloads',
  namespaced: true,
};

export const WorkloadGroupVersionKind = {
  group: KUEUE_API_GROUP,
  version: KUEUE_API_VERSION,
  kind: 'Workload',
};
