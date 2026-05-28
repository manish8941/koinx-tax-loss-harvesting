import { capitalGainsData } from '../data/capitalGains';
import { holdingsData } from '../data/holdings';
import type { CapitalGainsResponse, Holding } from '../types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCapitalGains = async (): Promise<CapitalGainsResponse> => {
  await wait(350);
  return capitalGainsData;
};

export const getHoldings = async (): Promise<Holding[]> => {
  await wait(450);
  return holdingsData;
};
