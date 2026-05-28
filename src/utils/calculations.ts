import type { CapitalGains, Holding } from '../types';

export const calculateNetGain = (bucket: { profits: number; losses: number }): number => {
  return bucket.profits - bucket.losses;
};

export const calculateRealisedGain = (capitalGains: CapitalGains): number => {
  return calculateNetGain(capitalGains.stcg) + calculateNetGain(capitalGains.ltcg);
};

const applyGainToBucket = (bucket: { profits: number; losses: number }, gain: number) => {
  if (gain >= 0) {
    bucket.profits += gain;
  } else {
    bucket.losses += Math.abs(gain);
  }
};

export const calculateAfterHarvesting = (
  baseCapitalGains: CapitalGains,
  holdings: Holding[],
  selectedCoins: Set<string>
): CapitalGains => {
  const after: CapitalGains = {
    stcg: { ...baseCapitalGains.stcg },
    ltcg: { ...baseCapitalGains.ltcg },
  };

  holdings.forEach((holding) => {
    const rowId = `${holding.coin}-${holding.coinName}`;
    if (!selectedCoins.has(rowId)) return;

    applyGainToBucket(after.stcg, holding.stcg.gain);
    applyGainToBucket(after.ltcg, holding.ltcg.gain);
  });

  return after;
};
