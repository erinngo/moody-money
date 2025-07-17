/**
 *
 * generateMonths를 통해 현재 달을 구하고, 해당 달의 날짜를 구하는 util
 * -> 특정달(날짜)의 data만 부르기위해 필요
 */
export const getMonthRange = (month: string): { start: Date; end: Date } => {
  const [year, monthStr] = month.split("-");
  const y = parseInt(year, 10);
  const m = parseInt(monthStr, 10) - 1;

  const start = new Date(y, m, 1);
  const end = new Date(y, m + 1, 0, 23, 59, 59); // 해당 월 마지막 날 + 시간( 23:59:59 )

  return { start, end };
};
