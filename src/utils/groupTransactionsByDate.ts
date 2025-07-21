import type { Transaction } from "@/store/useTransactionStores";

/**
 * 날짜별로 그룹핑하고, 토탈값 계산, 리스트 정리
 */
export type GroupByDate = Record<
  string,
  { total: number; items: Transaction[] }
>;

export const groupTransactionsByDate = (data: Transaction[]): GroupByDate => {
  const groupedByDate: GroupByDate = {};
  data.forEach((item) => {
    const t = item.date?.toDate?.() || new Date(item.date);
    const formattedDate = `${t.getMonth() + 1}월 ${t.getDate()}일`;

    if (!groupedByDate[formattedDate]) {
      groupedByDate[formattedDate] = { total: 0, items: [] };
    }
    groupedByDate[formattedDate].total += item.amount;
    groupedByDate[formattedDate].items.push(item);
  });

  return groupedByDate;
};
