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
  userInfo?: null;
  /** 授权信息 */
  token?: string;
}

export type AuthActions = {
}

export type AuthStore = AuthState & AuthActions

export const createDefaultAuthState = () => ({} as AuthState);

export const createAuthStore = (
  initState: AuthState = createDefaultAuthState(),
) => {
  return createStore<AuthStore>()(() => ({
    ...initState,
  }));
}
