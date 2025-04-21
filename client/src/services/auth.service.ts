import { instance } from "../api/axios.api";
import { ResponseUserData, User, UserData } from "../types/types";

export const AuthService = {
  async signUp(userData: UserData): Promise<ResponseUserData | undefined> {
    const { data } = await instance.post<ResponseUserData>("user", userData);
    return data;
  },
  async login(userData: UserData): Promise<User | undefined> {
    const { data } = await instance.post<User>("auth/login", userData);
    return data;
  },
  async getProfile(): Promise<User | undefined> {
    const { data } = await instance.get<User>("auth/profile");
    if (data) return data;
  },
};
