import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { getMonthRange } from "@/utils/getMonthRange";

export interface Transaction {
  id: string;
  amount: number;
  selectedEmotion: string;
  selectedCategory: string;
  date: any;
  memo?: string;
}

interface TransactionState {
  user: User | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  fetchTransactionsByMonth: (month: string) => Promise<Transaction[]>;
  fetchAllTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      user: null,
      transactions: [],
      loading: false,
      error: null,

      setUser: (user) => set({ user }),

      fetchTransactionsByMonth: async (month: string) => {
        set({ loading: true, error: null });
        const { user } = get();
        if (!user) {
          set({ loading: false, error: "로그인이 필요합니다." });
          return [];
        }

        try {
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
        const { user } = get();
        if (!user) {
          set({ loading: false, error: "로그인이 필요합니다." });
          return;
        }

        try {
          const db = getFirestore();
          const now = new Date();
          const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
          const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

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
    }),
    {
      name: "transaction-store", //로컬스토리지 key
      partialize: (state) => ({
        user: state.user, // 유저 정보
        transactions: state.transactions, // 내역 캐싱
      }),
    }
  )
);
