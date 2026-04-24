# RHBoK Console Plugin

An OpenShift Console dynamic plugin for managing [Red Hat Build of Kueue](https://github.com/openshift/kueue-operator) resources. Provides list and detail views for all Kueue CRDs directly in the OpenShift Console Administrator perspective.

## Features

- **Dedicated Kueue navigation section** in the Administrator perspective sidebar
- **List and detail views** for all 8 Kueue resource types:
  - **ClusterQueue** — quota management with resource group visualization and pending workload tracking
  - **LocalQueue** — namespace-scoped queue routing with workload listing
  - **Workload** — job admission lifecycle with pod sets, admission checks, and conditions tabs
  - **ResourceFlavor** — node resource descriptions with labels, taints, and topology
  - **Cohort** — ClusterQueue grouping with member queue listing
  - **AdmissionCheck** — gate-keeping mechanisms for workload admission
  - **WorkloadPriorityClass** — priority definitions for queueing and preemption
  - **Kueue Config** — operator configuration singleton view
- **Status badges** — color-coded Active/Inactive and workload phase indicators
- **Quota visualization** — progress bars showing resource usage against nominal quotas
- **YAML templates** — pre-populated templates for creating each resource type
- **Feature flag gating** — nav items and pages only appear when Kueue CRDs are installed

## Prerequisites

- OpenShift 4.x cluster
- [Kueue Operator](https://github.com/openshift/kueue-operator) installed via OLM
- Kueue CR created (`kind: Kueue`, `name: cluster`) to provision CRDs
- Node.js 20+ and Yarn 4

## Development

```bash
# Install dependencies
yarn install

# Start the plugin dev server (serves on port 9001)
yarn start

# Run OpenShift Console in a container connected to the dev plugin
yarn start-console
```

The `start-console` script requires `oc` to be logged into a cluster and runs the Console in a local container with the plugin connected via `--plugin-proxy`.

## Build

```bash
yarn build
```

## Deployment

### Container Image

```bash
podman build -t <registry>/rhbok-console-plugin:latest .
podman push <registry>/rhbok-console-plugin:latest
```

### Helm

```bash
helm upgrade --install rhbok-console-plugin charts/openshift-console-plugin \
  --namespace rhbok-console-plugin \
  --create-namespace \
  --set plugin.image=<registry>/rhbok-console-plugin:latest
```

The Helm chart creates the Deployment, Service, ConsolePlugin CR, and a post-install Job that patches the Console operator to enable the plugin.

## Technology

- [OpenShift Console Dynamic Plugin SDK](https://github.com/openshift/console/tree/main/frontend/packages/console-dynamic-plugin-sdk) 4.21
- [PatternFly 6](https://www.patternfly.org/) 6.2
- React 17
- TypeScript 5.9
- Webpack (module federation via `ConsoleRemotePlugin`)

## Kueue API

All resources target `kueue.x-k8s.io/v1beta1` except the operator CR which uses `kueue.openshift.io/v1`.

## Project Structure

```
src/
├── components/shared/     # StatusBadge, ConditionsTable, QuotaBar
├── const.ts               # API groups, versions, plugin name
├── models/                # K8sModel and GroupVersionKind per CRD
├── templates/             # YAML templates for resource creation
├── types/                 # TypeScript interfaces per CRD
├── utils/                 # Status, quota, URL helpers
└── views/                 # List and detail view components per resource
```

## License

Apache-2.0
