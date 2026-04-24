import { KUEUE_API_GROUP, KUEUE_API_VERSION } from '../const';

function gvk(kind: string): string {
  return `${KUEUE_API_GROUP}~${KUEUE_API_VERSION}~${kind}`;
}

export function clusterQueueUrl(name?: string): string {
  const base = `/k8s/cluster/${gvk('ClusterQueue')}`;
  return name ? `${base}/${name}` : base;
}

export function localQueueUrl(namespace: string, name?: string): string {
  const base = `/k8s/ns/${namespace}/${gvk('LocalQueue')}`;
  return name ? `${base}/${name}` : base;
}

export function workloadUrl(namespace: string, name?: string): string {
  const base = `/k8s/ns/${namespace}/${gvk('Workload')}`;
  return name ? `${base}/${name}` : base;
}

export function resourceFlavorUrl(name?: string): string {
  const base = `/k8s/cluster/${gvk('ResourceFlavor')}`;
  return name ? `${base}/${name}` : base;
}

export function cohortUrl(name?: string): string {
  const base = `/k8s/cluster/${gvk('Cohort')}`;
  return name ? `${base}/${name}` : base;
}
