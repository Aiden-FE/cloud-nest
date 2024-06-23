import { createStore } from 'zustand/vanilla';
import SDK from 'casdoor-js-sdk';
import { SDK as ServerSDK } from 'casdoor-nodejs-sdk';
import { User } from 'casdoor-nodejs-sdk/lib/cjs/user';

export function getCasdoorSDK(options?: { redirectPath?: string }) {
  return new SDK({
    serverUrl: 'https://aidencasdoor.cpolar.cn',
    clientId: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID || '',
    organizationName: 'compass',
    appName: 'cloud-nest',
    redirectPath: options?.redirectPath || '/login-callback',
  });
}

export const casdoorServerSDK = new ServerSDK({
  endpoint: 'https://aidencasdoor.cpolar.cn',
  clientId: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID || '',
  orgName: 'compass',
  appName: 'cloud-nest',
  clientSecret: process.env.CASDOOR_CLIENT_SECRET || '',
  certificate: process.env.CASDOOR_CERTIFICATE || '',
});

export type AuthState = {
  /** 用户登录信息 */
  userInfo?: User;
  /** 授权信息 */
  access_token?: string;
  /** 刷新授权token */
  refresh_token?: string;
};

export type AuthActions = {
  setUserInfo: (userInfo?: AuthState['userInfo']) => void;
  setToken: (data: { access_token: string; refresh_token?: string }) => void;
};

export type AuthStore = AuthState & AuthActions;

export const createDefaultAuthState = () => ({}) as AuthState;

export const createAuthStore = (initState: AuthState = createDefaultAuthState()) =>
  createStore<AuthStore>()((set) => ({
    ...initState,
    setUserInfo: (userInfo) =>
      set((state) => ({
        ...state,
        userInfo,
      })),
    setToken: (data) =>
      set((state) => ({
        ...state,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })),
  }));
