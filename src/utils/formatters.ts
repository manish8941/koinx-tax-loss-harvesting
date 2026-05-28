export const formatCurrency = (value: number): string => {
  const absValue = Math.abs(value);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: absValue >= 1000 ? 0 : 2,
    minimumFractionDigits: absValue >= 1000 ? 0 : 2,
  }).format(absValue);

  return value < 0 ? `-${formatted}` : formatted;
};

export const formatNumber = (value: number): string => {
  const absValue = Math.abs(value);

  if (absValue !== 0 && absValue < 0.000001) {
    return value.toExponential(2);
  }

  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: absValue >= 1 ? 4 : 8,
  }).format(value);
};

export const formatCompactCurrency = (value: number): string => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 10000000) return `${sign}₹${(absValue / 10000000).toFixed(2)}Cr`;
  if (absValue >= 100000) return `${sign}₹${(absValue / 100000).toFixed(2)}L`;
  if (absValue >= 1000) return `${sign}₹${(absValue / 1000).toFixed(2)}K`;
  return formatCurrency(value);
};
