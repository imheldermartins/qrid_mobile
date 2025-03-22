export type UserData = {
  email: string;
  first_name: string;
  last_name: string;
  tags: string[];
  created_at: string | Date;
  updated_at: string | Date;
  is_business: boolean;
  is_active: boolean;
};

/**
 * {
 * "balance": "0.00",
 * "date_joined": "2025-03-09T13:55:09.827065-03:00",
 * "email": "admin@qrid.app",
 * "first_name": "Helder",
 * "last_name": "Martins",
 * "role": "user",
 * "tags": [],
 * "total_expense": "0.00",
 * "total_income": "0.00",
 * "total_transactions": 0
 * }
 */
