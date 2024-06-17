import { createStore } from 'zustand/vanilla';
import SDK from 'casdoor-js-sdk';

export function getCasdoorSDK(options?: { redirectPath?: string; }) {
  return new SDK({
    serverUrl: 'https://aidencasdoor.cpolar.cn',
    clientId: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID || '',
    organizationName: 'compass',
    appName: 'cloud-nest',
    redirectPath: options?.redirectPath || '/login-callback',
  });
}

export type AuthState = {
  /** 用户登录信息 */
  userInfo?: any;
  /** 授权信息 */
  access_token?: string;
  /** 刷新授权token */
  refresh_token?: string;
}

export type AuthActions = {
  setUserInfo: (userInfo: any) => void;
  setToken: (data: { access_token: string; refresh_token?: string }) => void;
}

export type AuthStore = AuthState & AuthActions

export const createDefaultAuthState = () => ({} as AuthState);

export const createAuthStore = (
  initState: AuthState = createDefaultAuthState(),
) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setUserInfo: (userInfo: any) => set((state) => {
      return {
        ...state,
        userInfo,
      };
    }),
    setToken: (data) => set((state) => {
      return {
        ...state,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      };
    }),
  }));
}
