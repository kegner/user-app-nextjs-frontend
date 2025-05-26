import { ReactNode } from 'react';

export type ColumnDef<T> = {
  id: string;
  field?: keyof T;
  headerName: string;
  formatter?: (row: T) => ReactNode;
};

export type User = {
  id: string;
  createdDate: Date;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserKey = keyof User;

export type QueryParams = {
  search?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowType = Record<string, any> & { id: string };

export type FormState<T> = {
  error?: boolean;
  message?: string;
  validationErrors?: Map<keyof T, string[]>;
};
