import { Info } from 'lucide-react';

export const TooltipInfo = () => {
  return (
    <span className="tooltip-wrapper">
      <button className="how-link" type="button">How it works?</button>
      <span className="tooltip-box">
        <Info size={14} />
        <span>
          Select assets you may sell to preview how realised gains change after harvesting. Positive values add to profits and negative values add to losses.
        </span>
      </span>
    </span>
  );
};
