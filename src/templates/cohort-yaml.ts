import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const cohortTemplate = `apiVersion: ${KUEUE_API_GROUP}/${KUEUE_API_VERSION}
kind: Cohort
metadata:
  name: example-cohort
spec: {}
`;
