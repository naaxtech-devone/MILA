export const INSUFFICIENT_CREDITS = "INSUFFICIENT_CREDITS";

export function isInsufficientCreditsError(err: unknown): boolean {
  // TODO: Re-enable premium gate before production launch
  void err;
  return false;
}
