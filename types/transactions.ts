import { IconFrom } from "@/components/ui/Icon";
import { STATIC_COLORS } from "@/styles/colors";

type D = number | string;
type M = number | string;
type Y = number | string;

export type TListDate = `${D}-${M}-${Y}`;

type TGroupedByScheduledDate = Record<TListDate, Transaction[]>;

export type TransactionList = TGroupedByScheduledDate;

export type Transaction = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  payment_method: string;
  amount: number;
  scheduled_date: TListDate;
  created_at: string | Date;
  updated_at: string | Date;
  category: Category;
  // wallet_monthly: number;
  wallet: Wallet;
  owner: number;
};

export type Wallet = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  type: "income" | "expense" | "transfer";
  icon: `${IconFrom}:${string}`;
  color: STATIC_COLORS; // feat: add colorsPallete to category
};
