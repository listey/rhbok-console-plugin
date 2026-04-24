export function parseQuantity(value: string | undefined): number {
  if (!value) return 0;
  const suffixes: Record<string, number> = {
    m: 0.001,
    Ki: 1024,
    Mi: 1024 ** 2,
    Gi: 1024 ** 3,
    Ti: 1024 ** 4,
    Pi: 1024 ** 5,
  };
  for (const [suffix, multiplier] of Object.entries(suffixes)) {
    if (value.endsWith(suffix)) {
      return parseFloat(value.slice(0, -suffix.length)) * multiplier;
    }
  }
  return parseFloat(value) || 0;
}

export function formatQuantity(value: string | undefined): string {
  return value ?? '—';
}

export function quotaPercent(used: string | undefined, nominal: string | undefined): number {
  const n = parseQuantity(nominal);
  if (n === 0) return 0;
  return Math.min(100, Math.round((parseQuantity(used) / n) * 100));
}
