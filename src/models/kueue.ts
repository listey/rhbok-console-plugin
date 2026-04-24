import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_OPERATOR_API_GROUP, KUEUE_OPERATOR_API_VERSION } from '../const';

export const KueueModel: K8sModel = {
  apiGroup: KUEUE_OPERATOR_API_GROUP,
  apiVersion: KUEUE_OPERATOR_API_VERSION,
  kind: 'Kueue',
  plural: 'kueues',
  abbr: 'KU',
  label: 'Kueue',
  labelPlural: 'Kueues',
  namespaced: true,
};

export const KueueGroupVersionKind = {
  group: KUEUE_OPERATOR_API_GROUP,
  version: KUEUE_OPERATOR_API_VERSION,
  kind: 'Kueue',
};
