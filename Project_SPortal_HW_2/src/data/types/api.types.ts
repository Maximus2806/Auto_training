export interface IRequestOptions {
    method: "get" | "post" | "put" | "delete";
    headers?: Record<string, string>;
    body?: string;
  }

export interface IGetAllParams {
  manufacturer?: string;
  search?: string;
  sortField?: string;
  sortOrder?: string;
}