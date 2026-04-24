import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const WorkloadPriorityClassModel: K8sModel = {
  apiGroup: KUEUE_API_GROUP,
  apiVersion: KUEUE_API_VERSION,
  kind: 'WorkloadPriorityClass',
  plural: 'workloadpriorityclasses',
  abbr: 'WPC',
  label: 'WorkloadPriorityClass',
  labelPlural: 'WorkloadPriorityClasses',
  namespaced: false,
};

export const WorkloadPriorityClassGroupVersionKind = {
  group: KUEUE_API_GROUP,
  version: KUEUE_API_VERSION,
  kind: 'WorkloadPriorityClass',
};
