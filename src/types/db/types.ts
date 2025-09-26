import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { ROLES } from "./enums";

export type User = {
  id: Generated<string>;
  prefix: Generated<string>;
  telNumber: string | null;
  password: string;
  nickName: string | null;
  email: string;
  role: Generated<ROLES>;
};
export type DB = {
  User: User;
};
