import { Progress, ProgressMeasureLocation } from '@patternfly/react-core';
import { quotaPercent, formatQuantity } from '../../utils/quota';

interface QuotaBarProps {
  resourceName: string;
  used: string | undefined;
  nominal: string | undefined;
  borrowed?: string;
}

export const QuotaBar: React.FC<QuotaBarProps> = ({
  resourceName,
  used,
  nominal,
  borrowed,
}) => {
  const percent = quotaPercent(used, nominal);
  const variant = percent >= 90 ? 'danger' : percent >= 70 ? 'warning' : undefined;
  const label = `${formatQuantity(used)} / ${formatQuantity(nominal)}${borrowed ? ` (+${borrowed} borrowed)` : ''}`;

  return (
    <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
      <div style={{ marginBottom: 'var(--pf-t--global--spacer--xs)' }}>
        <strong>{resourceName}</strong>
      </div>
      <Progress
        value={percent}
        title={resourceName}
        label={label}
        measureLocation={ProgressMeasureLocation.outside}
        variant={variant}
        aria-label={`${resourceName} quota usage`}
      />
    </div>
  );
};

export default QuotaBar;
