import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql_hr = neon(process.env.NEON_DATABASE_URL!);
export const db_hr = drizzle(sql_hr);

const sql_clerk = neon(process.env.NEON_DATABASE_URL_CLERK!);
export const db_clerk = drizzle(sql_clerk);

const sql_admin = neon(process.env.NEON_DATABASE_URL_ADMIN!);
export const db_admin = drizzle(sql_admin);

const sql_opinions = neon(process.env.NEON_DATABASE_URL_OPINIONS!);
export const db_opinions = drizzle(sql_opinions);
