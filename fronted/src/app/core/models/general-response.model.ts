export interface GeneralResponse<T> {
  status: string;
  code: number;
  detail: string;
  reason: string;
  reply: T;
}
