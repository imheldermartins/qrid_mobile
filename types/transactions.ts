export type Transaction = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  payment_method: string;
  amount: number;
  scheduled_date: `${number}-${number}-${number}`;
  created_at: string | Date;
  updated_at: string | Date;
  category: Category;
  wallet_monthly: number;
  owner: number;
};

export type Category = {
  id: number;
  name: string;
  type: "income" | "expense" | "transfer";
  icon: string;
  color: string; // feat: add colorsPallete to category
};
