// configs/NilePostgresConfig.ts
import { Pool } from "pg";

// Initialize the Pool for better connection management
export const pool = new Pool({
  user: process.env.EXPO_PUBLIC_DB_USERNAME,
  password: process.env.EXPO_PUBLIC_DB_PASSWORD,
  host: "us-west-2.db.thenile.dev",
  port: 5432,
  database: "Campus_Guru_prod_app",
});
