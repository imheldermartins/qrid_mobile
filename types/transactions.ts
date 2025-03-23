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
  category: number;
  wallet_monthly: number;
  owner: number;
};
