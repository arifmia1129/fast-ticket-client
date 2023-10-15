export interface IMeta {
  page: number;
  limit: number;
  size: number;
}

export interface ICustomResponse {
  data: any;
  meta: IMeta;
}
