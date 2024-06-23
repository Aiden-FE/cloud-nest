import { PERMISSIONS } from './config';

declare module '*.svg' {
  import { FC, SVGProps } from 'react';

  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: any;
  export default content;
}

declare module 'casdoor-nodejs-sdk/lib/cjs/user' {
  export interface User {
    permissions: {
      name: PERMISSIONS;
      isEnabled: boolean;
      effect: 'Allow' | string;
      state: 'Approved' | string;
    }[];
    exp: number;
  }
}
