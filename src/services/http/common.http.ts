import { AxiosResponse } from "axios";
import { http } from "@/services/http/http"

export type UserData = {
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

export default class CommonAPI {
  async getUserById(id: number): Promise<AxiosResponse<UserData>> {
    return await http().get(`/users/${id}`);
  }
}