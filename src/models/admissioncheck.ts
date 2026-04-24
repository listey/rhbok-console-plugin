import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const AdmissionCheckModel: K8sModel = {
  apiGroup: KUEUE_API_GROUP,
  apiVersion: KUEUE_API_VERSION,
  kind: 'AdmissionCheck',
  plural: 'admissionchecks',
  abbr: 'AC',
  label: 'AdmissionCheck',
  labelPlural: 'AdmissionChecks',
  namespaced: false,
};

export const AdmissionCheckGroupVersionKind = {
  group: KUEUE_API_GROUP,
  version: KUEUE_API_VERSION,
  kind: 'AdmissionCheck',
};
