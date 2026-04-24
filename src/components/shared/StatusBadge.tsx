import { Label } from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InProgressIcon,
  BanIcon,
  ClockIcon,
} from '@patternfly/react-icons';
import { WorkloadPhase } from '../../types/workload';

export const ActiveStatusBadge: React.FC<{ active: boolean | undefined }> = ({ active }) => {
  if (active === true) {
    return (
      <Label color="green" icon={<CheckCircleIcon />} isCompact>
        Active
      </Label>
    );
  }
  return (
    <Label color="red" icon={<ExclamationCircleIcon />} isCompact>
      Inactive
    </Label>
  );
};

const phaseConfig: Record<WorkloadPhase, { color: React.ComponentProps<typeof Label>['color']; icon: React.ReactNode }> = {
  Admitted: { color: 'green', icon: <CheckCircleIcon /> },
  QuotaReserved: { color: 'blue', icon: <InProgressIcon /> },
  Pending: { color: 'yellow', icon: <ClockIcon /> },
  Evicted: { color: 'red', icon: <BanIcon /> },
  Finished: { color: 'grey', icon: <CheckCircleIcon /> },
};

export const WorkloadPhaseBadge: React.FC<{ phase: WorkloadPhase }> = ({ phase }) => {
  const config = phaseConfig[phase];
  return (
    <Label color={config.color} icon={config.icon} isCompact>
      {phase}
    </Label>
  );
};

export default ActiveStatusBadge;
