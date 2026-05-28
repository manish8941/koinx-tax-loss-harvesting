import { useEffect, useMemo, useState } from 'react';
import { getCapitalGains, getHoldings } from '../api/mockApi';
import type { CapitalGains, Holding, SortDirection, SortKey } from '../types';
import { calculateAfterHarvesting, calculateRealisedGain } from '../utils/calculations';

const getRowId = (holding: Holding) => `${holding.coin}-${holding.coinName}`;
const MIN_DISPLAYABLE_SAVINGS = 0.005;

export const useTaxHarvesting = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [capitalGainsResponse, holdingsResponse] = await Promise.all([
          getCapitalGains(),
          getHoldings(),
        ]);
        setCapitalGains(capitalGainsResponse.capitalGains);
        setHoldings(holdingsResponse);
      } catch {
        setError('Unable to load tax harvesting data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const sortedHoldings = useMemo(() => {
    const copy = [...holdings];
    if (!sortKey) return copy;

    return copy.sort((a, b) => {
      const diff = a[sortKey].gain - b[sortKey].gain;
      return sortDirection === 'asc' ? diff : -diff;
    });
  }, [holdings, sortDirection, sortKey]);

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  const selectedHoldings = useMemo(() => {
    return holdings.filter((holding) => selectedRows.has(getRowId(holding)));
  }, [holdings, selectedRows]);

  const afterHarvesting = useMemo(() => {
    if (!capitalGains) return null;
    return calculateAfterHarvesting(capitalGains, selectedHoldings);
  }, [capitalGains, selectedHoldings]);

  const preRealisedGain = capitalGains ? calculateRealisedGain(capitalGains) : 0;
  const afterRealisedGain = afterHarvesting ? calculateRealisedGain(afterHarvesting) : 0;
  const savings =
    preRealisedGain - afterRealisedGain >= MIN_DISPLAYABLE_SAVINGS
      ? preRealisedGain - afterRealisedGain
      : 0;

  const toggleRow = (holding: Holding) => {
    const rowId = getRowId(holding);
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedRows((prev) => {
      if (prev.size === holdings.length) return new Set();
      return new Set(holdings.map(getRowId));
    });
  };

  const changeSort = (key: Exclude<SortKey, null>) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  return {
    holdings,
    visibleHoldings,
    capitalGains,
    afterHarvesting,
    selectedHoldings,
    selectedRows,
    sortKey,
    sortDirection,
    showAll,
    loading,
    error,
    preRealisedGain,
    afterRealisedGain,
    savings,
    toggleRow,
    toggleAll,
    changeSort,
    setShowAll,
    getRowId,
  };
};
