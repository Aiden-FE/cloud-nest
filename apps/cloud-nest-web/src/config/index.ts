export const IS_DEV = process.env.NODE_ENV === 'development';

export enum AvailableTheme {
  /** 跟随系统主题变化 */
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

export enum AvailableLanguages {
  ZH = 'zh',
  EN = 'en',
}

export enum AvailableLanguagesNS {
  COMMON = 'common',
}

export const Languages = [AvailableLanguages.ZH, AvailableLanguages.EN];

/**
 * 权限
 * [组织id].[应用id].[资源id].[操作id=read/write]
 */
export enum PERMISSIONS {
  // 管理员权限
  OSS_MANAGE = 'compass.cloud-nest.oss-superadmin',
}

// redis key 前缀
export const REDIS_PREFIX = 'compass.cloud-nest.';

// 管理员内置存储桶
export const OSS_ADMIN_BUCKET_NAME = 'aiden-private';
