import { BankAccount } from "../../entities/bank-account";
import { httpClient } from "../http-client";

type BankAccountsResponse = Array<BankAccount>

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts')

  return data;
}
