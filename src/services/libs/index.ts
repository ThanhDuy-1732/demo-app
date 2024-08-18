export const formatNumber = (value: number): string => {
  return Number(value || 0).toLocaleString('en-US');
}