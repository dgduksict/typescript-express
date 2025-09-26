import { db } from "../utils/db";
import { User } from "../types/db/types";
import { Updateable, Insertable } from "kysely";

export const userRepository = {
  create: async (data: Insertable<User>) => {
    const user = await db
      .insertInto("User")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow(() => new Error("Couldn't create the user."));

    return user;
  },
  update: async (id: string, data: Updateable<User>) => {
    const user = await db
      .updateTable("User")
      .returningAll()
      .set(data)
      .where("id", "=", id)
      .executeTakeFirstOrThrow(() => new Error("Couldn't update the user."));

    return user;
  },
  delete: async (id: string) => {
    const user = await db
      .deleteFrom("User")
      .returningAll()
      .where("User.id", "=", id)
      .executeTakeFirstOrThrow(() => new Error("Couldn't delete the user."));

    return user;
  },
  getById: async (id: string) => {
    const user = await db
      .selectFrom("User")
      .selectAll()
      .where("User.id", "=", id)
      .executeTakeFirst();

    return user;
  },
};
