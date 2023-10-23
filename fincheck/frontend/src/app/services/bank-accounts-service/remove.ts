import { httpClient } from "../http-client";

export async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}`)

  return data;
}
