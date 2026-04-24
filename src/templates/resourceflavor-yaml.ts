import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const resourceFlavorTemplate = `apiVersion: ${KUEUE_API_GROUP}/${KUEUE_API_VERSION}
kind: ResourceFlavor
metadata:
  name: default-flavor
spec:
  nodeLabels: {}
`;
