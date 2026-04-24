import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';

export interface Toleration {
  key?: string;
  operator?: string;
  value?: string;
  effect?: string;
  tolerationSeconds?: number;
}

export interface NodeTaint {
  key: string;
  value?: string;
  effect: string;
}

export interface ResourceFlavorKind extends K8sResourceCommon {
  spec?: {
    nodeLabels?: Record<string, string>;
    nodeTaints?: NodeTaint[];
    tolerations?: Toleration[];
    topologyName?: string;
  };
}
