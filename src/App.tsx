import { CapitalGainsCard } from './components/CapitalGainsCard';
import { Disclaimer } from './components/Disclaimer';
import { HoldingsTable } from './components/HoldingsTable';
import { Loader } from './components/Loader';
import { TooltipInfo } from './components/TooltipInfo';
import { useTaxHarvesting } from './hooks/useTaxHarvesting';

function App() {
  const tax = useTaxHarvesting();

  if (tax.loading) return <Loader />;

  if (tax.error || !tax.capitalGains || !tax.afterHarvesting) {
    return <div className="error-card">{tax.error || 'Something went wrong.'}</div>;
  }

  return (
    <main className="app-shell">
      <header className="hero-header">
        <div>
          <p className="eyebrow">KoinX Internship Assignment</p>
          <h1>Tax Optimisation <TooltipInfo /></h1>
        </div>
      </header>

      <Disclaimer />

      <section className="cards-grid">
        <CapitalGainsCard title="Pre Harvesting" data={tax.capitalGains} variant="dark" />
        <CapitalGainsCard
          title="After Harvesting"
          data={tax.afterHarvesting}
          variant="blue"
          savings={tax.savings}
        />
      </section>

      <HoldingsTable
        holdings={tax.holdings}
        visibleHoldings={tax.visibleHoldings}
        selectedRows={tax.selectedRows}
        sortKey={tax.sortKey}
        sortDirection={tax.sortDirection}
        showAll={tax.showAll}
        getRowId={tax.getRowId}
        toggleRow={tax.toggleRow}
        toggleAll={tax.toggleAll}
        changeSort={tax.changeSort}
        setShowAll={tax.setShowAll}
      />
    </main>
  );
}

export default App;
