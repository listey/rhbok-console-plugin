import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const clusterQueueTemplate = `apiVersion: ${KUEUE_API_GROUP}/${KUEUE_API_VERSION}
kind: ClusterQueue
metadata:
  name: example-cluster-queue
spec:
  queueingStrategy: BestEffortFIFO
  resourceGroups:
    - coveredResources:
        - cpu
        - memory
      flavors:
        - name: default-flavor
          resources:
            - name: cpu
              nominalQuota: "10"
            - name: memory
              nominalQuota: 36Gi
`;
