export type HttpTotalResult<T> = {
  [string: string]: unknown;
  total: number;
  list?: T[];
} & {
  code?: number;
  msg?: string;
};

export type HttpResult<T> = T & {
  code?: number;
  msg?: string;
};
