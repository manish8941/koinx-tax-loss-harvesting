import type { CapitalGains, GainBucket, Holding } from '../types';

export const calculateNetGain = (bucket: GainBucket): number => {
  return bucket.profits - bucket.losses;
};

export const calculateRealisedGain = (capitalGains: CapitalGains): number => {
  return calculateNetGain(capitalGains.stcg) + calculateNetGain(capitalGains.ltcg);
};

const applyGainToBucket = (bucket: GainBucket, gain: number) => {
  if (gain > 0) {
    bucket.profits += gain;
  } else if (gain < 0) {
    bucket.losses += Math.abs(gain);
  }
};

export const calculateAfterHarvesting = (
  baseCapitalGains: CapitalGains,
  selectedHoldings: Holding[]
): CapitalGains => {
  const after: CapitalGains = {
    stcg: { ...baseCapitalGains.stcg },
    ltcg: { ...baseCapitalGains.ltcg },
  };

  selectedHoldings.forEach((holding) => {
    applyGainToBucket(after.stcg, holding.stcg.gain);
    applyGainToBucket(after.ltcg, holding.ltcg.gain);
  });

  return after;
};
