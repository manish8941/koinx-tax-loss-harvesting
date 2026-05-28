import type { CapitalGains } from '../types';
import { calculateNetGain, calculateRealisedGain } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';

type CapitalGainsCardProps = {
  title: string;
  data: CapitalGains;
  variant: 'dark' | 'blue';
  savings?: number;
};

export const CapitalGainsCard = ({ title, data, variant, savings = 0 }: CapitalGainsCardProps) => {
  const realisedGain = calculateRealisedGain(data);
  const stcgNet = calculateNetGain(data.stcg);
  const ltcgNet = calculateNetGain(data.ltcg);

  return (
    <article className={`gain-card gain-card-${variant}`}>
      <h2>{title}</h2>
      <div className="gain-grid gain-grid-heading">
        <span />
        <span>Short-term</span>
        <span>Long-term</span>
      </div>
      <div className="gain-grid">
        <span>Profits</span>
        <strong>{formatCurrency(data.stcg.profits)}</strong>
        <strong>{formatCurrency(data.ltcg.profits)}</strong>
      </div>
      <div className="gain-grid">
        <span>Losses</span>
        <strong>{formatCurrency(data.stcg.losses)}</strong>
        <strong>{formatCurrency(data.ltcg.losses)}</strong>
      </div>
      <div className="gain-grid net-row">
        <span>Net Capital Gains</span>
        <strong>{formatCurrency(stcgNet)}</strong>
        <strong>{formatCurrency(ltcgNet)}</strong>
      </div>
      <div className="realised-row">
        <span>{variant === 'blue' ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}</span>
        <strong>{formatCurrency(realisedGain)}</strong>
      </div>
      {variant === 'blue' && savings > 0 && (
        <div className="saving-message">You're going to save {formatCurrency(savings)}</div>
      )}
    </article>
  );
};
