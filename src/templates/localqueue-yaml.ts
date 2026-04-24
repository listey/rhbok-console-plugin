import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const localQueueTemplate = `apiVersion: ${KUEUE_API_GROUP}/${KUEUE_API_VERSION}
kind: LocalQueue
metadata:
  name: example-local-queue
  namespace: default
spec:
  clusterQueue: example-cluster-queue
`;
