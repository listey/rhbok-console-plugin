import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const CohortModel: K8sModel = {
  apiGroup: KUEUE_API_GROUP,
  apiVersion: KUEUE_API_VERSION,
  kind: 'Cohort',
  plural: 'cohorts',
  abbr: 'CH',
  label: 'Cohort',
  labelPlural: 'Cohorts',
  namespaced: false,
};

export const CohortGroupVersionKind = {
  group: KUEUE_API_GROUP,
  version: KUEUE_API_VERSION,
  kind: 'Cohort',
};
