import { create } from "zustand";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMonthRange } from "@/utils/getMonthRange";

interface Transaction {
  id: string;
  amount: number;
  selectedEmotion: string;
  selectedCategory: string;
  date: any;
  memo?: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactionsByMonth: (month: string) => Promise<Transaction[]>;
  fetchAllTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactionsByMonth: async (month: string) => {
    set({ loading: true, error: null });

    try {
      const user = getAuth().currentUser;
      if (!user) {
        set({ loading: false, error: "로그인이 필요합니다." });
        return [];
      }

      const { start, end } = getMonthRange(month);
      const db = getFirestore();
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        where("date", ">=", Timestamp.fromDate(start)),
        where("date", "<=", Timestamp.fromDate(end))
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];

      set({ transactions: data, loading: false });
      return data;
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      }
      return [];
    }
  },

  fetchAllTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const user = getAuth().currentUser;
      if (!user) {
        set({ loading: false, error: "로그인이 필요합니다." });
        return;
      }

      const db = getFirestore();
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 11, 1); // 11개월 전 1일
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 이번 달 마지막 날

      const q = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        where("date", ">=", Timestamp.fromDate(start)),
        where("date", "<=", Timestamp.fromDate(end))
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];

      set({ transactions: data, loading: false });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
