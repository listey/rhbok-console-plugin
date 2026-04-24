import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const LocalQueueModel: K8sModel = {
  apiGroup: KUEUE_API_GROUP,
  apiVersion: KUEUE_API_VERSION,
  kind: 'LocalQueue',
  plural: 'localqueues',
  abbr: 'LQ',
  label: 'LocalQueue',
  labelPlural: 'LocalQueues',
  namespaced: true,
};

export const LocalQueueGroupVersionKind = {
  group: KUEUE_API_GROUP,
  version: KUEUE_API_VERSION,
  kind: 'LocalQueue',
};
