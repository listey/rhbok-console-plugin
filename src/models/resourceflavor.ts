import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const ResourceFlavorModel: K8sModel = {
  apiGroup: KUEUE_API_GROUP,
  apiVersion: KUEUE_API_VERSION,
  kind: 'ResourceFlavor',
  plural: 'resourceflavors',
  abbr: 'RF',
  label: 'ResourceFlavor',
  labelPlural: 'ResourceFlavors',
  namespaced: false,
};

export const ResourceFlavorGroupVersionKind = {
  group: KUEUE_API_GROUP,
  version: KUEUE_API_VERSION,
  kind: 'ResourceFlavor',
};
