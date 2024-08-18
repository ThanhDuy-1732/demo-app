import { create } from "zustand";
import { AuthAPI, MeData, SignInPayload } from "./auth.http";

type AuthState = {
  me: MeData | {},
  accessToken: string;
  refreshToken: string;
}

type AuthAction = {
  signOut: () => void;
  getMyId: () => number;
  getMe: () => Promise<void>;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  signIn: (payload: SignInPayload) => Promise<void>;
}

const useAuthStore = create<AuthState & AuthAction>((set, get) => {
  const setAccessToken = (accessToken: string) => {
    set(() => ({ accessToken }));
    localStorage.setItem('accessToken', accessToken);
  };

  const setRefreshToken = (refreshToken: string) => {
    set(() => ({ refreshToken }));
    localStorage.setItem('refreshToken', refreshToken);
  };

  const signIn = async (payload: SignInPayload) => {
    const api = new AuthAPI();
    const response = await api.signIn(payload);

    const accessToken = response?.data?.token;
    const refreshToken = response?.data?.refreshToken;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const getMe = async () => {
    const api = new AuthAPI();
    const response = await api.me();
    set(() => ({
      me: response.data || {},
    }))
  };

  const signOut = () => {
    get().setAccessToken('');
    get().setRefreshToken('');
  };

  const getMyId = () => (get().me as MeData)?.id;

  return {
    me: {},
    accessToken: '',
    refreshToken: '',

    getMe,
    signIn,
    getMyId,
    signOut,
    setAccessToken,
    setRefreshToken,
  }
})

export default useAuthStore;