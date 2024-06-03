import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/migrations",
  schema: "./server/schemas",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_POSTGRES_URL as string,
  },
});
