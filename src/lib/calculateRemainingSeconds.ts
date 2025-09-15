export const calculateRemainingSeconds = (expiredAt: string | Date) => {
  const now = new Date().getTime();
  const expiry = new Date(expiredAt).getTime();

  return Math.max(Math.floor((expiry - now) / 1000), 0);
};