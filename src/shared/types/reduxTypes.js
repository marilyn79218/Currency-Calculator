// @flow

export type DispatchType = {
  [key: string]: any,
} => mixed;

export type GetState = () => { [key: string]: any };
