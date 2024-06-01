import type { AdapterAccountType } from "next-auth/adapters";
import {
  text,
  pgEnum,
  boolean,
  pgTable,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

import { Role } from "@/types";

export const Roles = pgEnum(
  "roles",
  Object.values(Role) as [string, ...string[]]
);

export const users = pgTable("user", {
  name: text("name"),
  image: text("image"),
  email: text("email").notNull(),
  role: Roles("roles").default(Role.User),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
});

export const accounts = pgTable(
  "account",
  {
    scope: text("scope"),
    id_token: text("id_token"),
    token_type: text("token_type"),
    expires_at: integer("expires_at"),
    access_token: text("access_token"),
    provider: text("provider").notNull(),
    refresh_token: text("refresh_token"),
    session_state: text("session_state"),
    providerAccountId: text("providerAccountId").notNull(),
    type: text("type").$type<AdapterAccountType>().notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    token: text("token").notNull(),
    identifier: text("identifier").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verficationToken) => ({
    compositePk: primaryKey({
      columns: [verficationToken.identifier, verficationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    transports: text("transports"),
    counter: integer("counter").notNull(),
    credentialID: text("credentialID").notNull().unique(),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);
