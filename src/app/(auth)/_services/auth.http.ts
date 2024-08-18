import { AxiosResponse } from "axios";
import { http } from "@/services/http/http";

export type SignInPayload = {
  username: string;
  password: string;
  expiresInMins?: number;
}

export type SignInData = {
  id: number;
  email: string;
  image: string;
  token: string;
  gender: string;
  lastName: string;
  username: string;
  firstName: string;
  refreshToken: string;
}

export type MeData = {
  id: number;
  age: number;
  email: string;
  phone: string;
  image: string;
  gender: string;
  lastName: string;
  username: string;
  firstName: string;
  birthDate: string;
  maidenName: string;
};

export class AuthAPI {
  async signIn(data: SignInPayload): Promise<AxiosResponse<SignInData>> {
    return await http().post('/auth/login', data)
  }

  async me(): Promise<AxiosResponse<MeData>> {
    return await http().get('/auth/me');
  }
}