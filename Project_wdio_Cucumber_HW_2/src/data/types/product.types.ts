import { IResponseFields } from "./api.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number | string;
  amount: number | string;
  notes?: string;
}

export enum MANUFACTURERS {
  APPLE = "Apple",
  SAMSUNG = "Samsung",
  GOOGLE = "Google",
  MICROSOFT = "Microsoft",
  SONY = "Sony",
  XIAOMI = "Xiaomi",
  AMAZON = "Amazon",
  TESLA = "Tesla",
}

export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export type AddProductFields =
  | "Name input"
  | "Manufacturer dropdown"
  | "Price input"
  | "Amount input"
  | "Notes textarea";
