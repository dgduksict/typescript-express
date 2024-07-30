import { Prisma } from "@prisma/client";
import { db } from "../utils/db";
import { User } from "../types/db/types";
import { Updateable } from "kysely";

export const userRepository = {
  getUserByPhoneNumber: async (phoneNumber: string, prefix: string) => {
    const user = await db
      .selectFrom("User")
      .where("User.telNumber", "=", phoneNumber)
      .where("User.prefix", "=", prefix)
      .selectAll()
      .executeTakeFirst();

    return user;
  },
  getUserById: async (id: string) => {
    const user = await db
      .selectFrom("User")
      .where("User.id", "=", id)
      .selectAll()
      .executeTakeFirst();

    return user;
  },
  create: async (data: Prisma.UserCreateInput) => {
    const user = await db
      .insertInto("User")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow(() => new Error("Could not create the user."));

    return user;
  },
  update: async (id: string, data: Prisma.UserCreateInput) => {
    const user = await db
      .updateTable("User")
      .set(data)
      .where("User.id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow(() => new Error("Could not update the user."));

    return user;
  },
  updateAsKysely: async (id: string, data: Updateable<User>) => {
    const user = await db
      .updateTable("User")
      .set(data)
      .where("User.id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow(() => new Error("Could not update the user."));

    return user;
  },
  delete: async (id: string) => {
    const deletedUser = await db
      .deleteFrom("User")
      .where("User.id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow(() => new Error("Could not delete the user."));

    return deletedUser;
  },
};
