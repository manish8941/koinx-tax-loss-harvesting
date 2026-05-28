import { Info, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const Disclaimer = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="disclaimer">
      <button className="disclaimer-header" type="button" onClick={() => setOpen((value) => !value)}>
        <span><Info size={18} /> Important Notes And Disclaimers</span>
        <ChevronDown className={open ? 'rotate' : ''} size={20} />
      </button>
      {open && (
        <div className="disclaimer-body">
          This tool is an illustrative tax optimisation calculator. Final tax treatment may depend on transaction history, jurisdiction, holding period, and applicable regulations.
        </div>
      )}
    </section>
  );
};
