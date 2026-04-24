import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const workloadPriorityClassTemplate = `apiVersion: ${KUEUE_API_GROUP}/${KUEUE_API_VERSION}
kind: WorkloadPriorityClass
metadata:
  name: example-priority
value: 100
description: Example priority class
`;
