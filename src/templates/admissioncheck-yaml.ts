import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

export const admissionCheckTemplate = `apiVersion: ${KUEUE_API_GROUP}/${KUEUE_API_VERSION}
kind: AdmissionCheck
metadata:
  name: example-admission-check
spec:
  controllerName: example-controller
`;
