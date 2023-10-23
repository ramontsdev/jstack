import { httpClient } from "../http-client";

export type SignUpParams = {
  name: string;
  email: string;
  password: string;
}

type SignUpResponse = { accessToken: string }

export async function signup(params: SignUpParams) {
  const { data } = await httpClient.post<SignUpResponse>('/auth/signup', params)

  return data;
}
