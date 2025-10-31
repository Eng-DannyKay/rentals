/**
 * Checks if the difference between the current time and the given date stamp exceeds the specified time limit in hours.
 * @param dateStamp - The date to compare against the current time.
 * @param timeLimitInHours - The time limit in hours to check the difference against. Defaults to 24 hours.
 * @returns `true` if the difference exceeds the time limit, otherwise `false`.
 */
export function timeDifferenceChecker(
  dateStamp: Date | string,
  timeLimitInHours = 24
): boolean {
  const timeToCheck = new Date(dateStamp).getTime();
  const currentTime = new Date().getTime();
  const hoursDifference = Math.abs(currentTime - timeToCheck) / 36e5;
  return hoursDifference > timeLimitInHours;
}
