
export function setCookie(
  name: string,
  value: string,
  options?: {
    path?: string;
    days?: number;
  },
) {
  const { path, days } = {
    path: '/',
    days: undefined,
    ...options,
  };
  // 将时间转换为到期时间的UTC字符串（如果天数为正数）
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  // 设置cookie
  document.cookie = `${name}=${value || ''}${expires}; path=${path}`;
}
