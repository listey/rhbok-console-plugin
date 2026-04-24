import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const ClusterQueueModel: K8sModel = {
  apiGroup: KUEUE_API_GROUP,
  apiVersion: KUEUE_API_VERSION,
  kind: 'ClusterQueue',
  plural: 'clusterqueues',
  abbr: 'CQ',
  label: 'ClusterQueue',
  labelPlural: 'ClusterQueues',
  namespaced: false,
};

export const ClusterQueueGroupVersionKind = {
  group: KUEUE_API_GROUP,
  version: KUEUE_API_VERSION,
  kind: 'ClusterQueue',
};
