import { httpClient } from "../http-client";

export type TransactionParams = {
  bankAccountId: string
  categoryId: string;
  name: string
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE"
}

export async function create(params: TransactionParams) {
  const { data } = await httpClient.post('/transactions', params)

  return data;
}
