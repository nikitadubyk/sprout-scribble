import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/migrations",
  schema: "./server/schema.ts",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
});
