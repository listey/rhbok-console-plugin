import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const workloadTemplate = `apiVersion: ${KUEUE_API_GROUP}/${KUEUE_API_VERSION}
kind: Workload
metadata:
  name: example-workload
  namespace: default
spec:
  queueName: example-local-queue
  podSets:
    - name: main
      count: 1
      template:
        spec:
          containers:
            - name: worker
              resources:
                requests:
                  cpu: "1"
                  memory: 1Gi
          restartPolicy: Never
`;
