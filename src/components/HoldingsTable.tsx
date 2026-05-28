import { ArrowDownUp, ChevronDown, ChevronUp } from 'lucide-react';
import type { Holding, SortDirection, SortKey } from '../types';
import { formatCompactCurrency, formatCurrency, formatNumber } from '../utils/formatters';

type HoldingsTableProps = {
  holdings: Holding[];
  visibleHoldings: Holding[];
  selectedRows: Set<string>;
  sortKey: SortKey;
  sortDirection: SortDirection;
  showAll: boolean;
  getRowId: (holding: Holding) => string;
  toggleRow: (holding: Holding) => void;
  toggleAll: () => void;
  changeSort: (key: 'stcg' | 'ltcg') => void;
  setShowAll: (value: boolean) => void;
};

export const HoldingsTable = ({
  holdings,
  visibleHoldings,
  selectedRows,
  sortKey,
  sortDirection,
  showAll,
  getRowId,
  toggleRow,
  toggleAll,
  changeSort,
  setShowAll,
}: HoldingsTableProps) => {
  const allSelected = holdings.length > 0 && selectedRows.size === holdings.length;
  const someSelected = selectedRows.size > 0 && !allSelected;

  const SortIcon = ({ column }: { column: 'stcg' | 'ltcg' }) => {
    if (sortKey !== column) return <ArrowDownUp size={15} />;
    return sortDirection === 'asc' ? <ChevronUp size={17} /> : <ChevronDown size={17} />;
  };

  return (
    <section className="table-card">
      <div className="table-title-row">
        <h2>Holdings</h2>
        <span>{selectedRows.size} selected</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={toggleAll}
                  aria-label="Select all holdings"
                />
              </th>
              <th>Asset</th>
              <th>Holdings <small>Avg Buy Price</small></th>
              <th>Current Price</th>
              <th>
                <button className="sort-button" type="button" onClick={() => changeSort('stcg')}>
                  Short-Term <SortIcon column="stcg" />
                </button>
              </th>
              <th>
                <button className="sort-button" type="button" onClick={() => changeSort('ltcg')}>
                  Long-Term <SortIcon column="ltcg" />
                </button>
              </th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => {
              const rowId = getRowId(holding);
              const isSelected = selectedRows.has(rowId);

              return (
                <tr key={rowId} className={isSelected ? 'selected-row' : ''}>
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(holding)}
                      aria-label={`Select ${holding.coin}`}
                    />
                  </td>
                  <td>
                    <div className="asset-cell">
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                      <div>
                        <strong title={holding.coinName}>{holding.coinName}</strong>
                        <span>{holding.coin}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{formatNumber(holding.totalHolding)} {holding.coin}</strong>
                    <small>{formatCurrency(holding.averageBuyPrice)}/{holding.coin}</small>
                  </td>
                  <td><strong>{formatCurrency(holding.currentPrice)}</strong></td>
                  <td>
                    <strong className={holding.stcg.gain >= 0 ? 'positive' : 'negative'}>
                      {formatCompactCurrency(holding.stcg.gain)}
                    </strong>
                    <small>{formatNumber(holding.stcg.balance)} {holding.coin}</small>
                  </td>
                  <td>
                    <strong className={holding.ltcg.gain >= 0 ? 'positive' : 'negative'}>
                      {formatCompactCurrency(holding.ltcg.gain)}
                    </strong>
                    <small>{formatNumber(holding.ltcg.balance)} {holding.coin}</small>
                  </td>
                  <td>
                    <strong>{isSelected ? `${formatNumber(holding.totalHolding)} ${holding.coin}` : '-'}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {holdings.length > 4 && (
        <button className="view-all" type="button" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'View Less' : `View All (${holdings.length})`}
        </button>
      )}
    </section>
  );
};
