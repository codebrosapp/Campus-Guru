
import { pool } from "@/configs/NilePostgresConfig";

export async function GET(request: Request) {
  try {
    const result = await pool.query(`SELECT * FROM clubs ORDER BY name ASC`);
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch clubs" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

