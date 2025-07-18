export interface credit {
  id: number;
  credit_id: string;
  approval_status: "approved" | "pending" | "denied";
  payment_status: "overdue" | "paid" | "partial" | "active" | "inactive";
  credit_amount: string;
  outstanding_amount: string;
  interest_rate: string;
  quantity: number;
  quantity_metric_name: string;
  input_credits: string;
  type: string;
  notes: string | null;
  date_created: string;
  due_date: string;
  issue_date: string | null;
  days_overdue: number;
}
