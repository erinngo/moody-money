// 현재 포함 과거 12개월에 대한 month 배열 생성
export const generateMonths = (count = 12): string[] => {
  const months: string[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    months.push(formatted);
  }

  return months;
};
