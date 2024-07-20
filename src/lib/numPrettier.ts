export function numPrettier(num: number, precision = 1): string {
  if (num < 999) {
    return `${num}`;
  }

  if (num < 1000000) {
    return (num / 1000).toFixed(precision) + " K";
  }

  if (num < 1000000000) {
    return (num / 1000000).toFixed(precision) + " M";
  }

  return (num / 1000000000).toFixed(precision) + " B";
}

export default numPrettier;
