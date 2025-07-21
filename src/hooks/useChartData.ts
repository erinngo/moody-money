import { useMemo } from "react";
import { computePieChartData } from "@/utils/computePieChart";
import { computeBarMatrix } from "@/utils/computeBarMatrix";
import type { Transaction } from "@/store/useTransactionStores";
import type { PieChartDataType } from "@/utils/computePieChart";
import type { BarMatrix } from "@/utils/computeBarMatrix";

export const useChartData = (transactions: Transaction[]) => {
  const pieData: PieChartDataType = useMemo(
    () => computePieChartData(transactions),
    [transactions]
  );

  const barData: BarMatrix = useMemo(
    () => computeBarMatrix(transactions),
    [transactions]
  );

  return { pieData, barData };
};
