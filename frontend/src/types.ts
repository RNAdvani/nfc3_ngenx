import { Icons } from "./components/iconss";

export type IUser = {
  email: string;
  name: string;
  password?: string;
};

export type UserRole = "admin" | "user";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface StockQuote {
  regularMarketPrice: {
    raw: number;
  };
  regularMarketTime: {
    raw: number;
  };
}

export interface StockData {
  quoteSummary: {
    result: {
      price: StockQuote;
    }[];
  };
}

export interface StockPoint {
  date: number;
  close: number;
}
