/* eslint-disable no-shadow */
export interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export enum ApiRol {
  admin = 'admin',
  user = 'user',
}
