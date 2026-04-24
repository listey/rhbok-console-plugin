import { PageSection } from '@patternfly/react-core';
import { WorkloadKind } from '../../types';
import { ConditionsTable } from '../../components/shared/ConditionsTable';

export default function WorkloadConditionsTab({ obj }: { obj: WorkloadKind }) {
  return (
    <PageSection>
      <ConditionsTable conditions={obj.status?.conditions} />
    </PageSection>
  );
}
