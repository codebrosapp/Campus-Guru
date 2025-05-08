import { pool } from "@/configs/NilePostgresConfig";

export async function POST(request: Request) {
  try {
    const { clubId, u_email } = await request.json();

    // Use parameterized queries to prevent SQL injection
    const result = await pool.query(
      `INSERT INTO clubfollowers (club_id, u_email) VALUES ($1, $2)`,
      [clubId, u_email]
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error inserting into clubfollowers:", error);
    return new Response(JSON.stringify({ message: "Error following club" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request) {
  try {
    const u_email = new URL(request.url).searchParams.get("u_email");

    if (!u_email) {
      return new Response(
        JSON.stringify({ message: "Missing user email" }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT * FROM clubfollowers WHERE u_email = $1`,
      [u_email]
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return new Response(JSON.stringify({ message: "Error fetching followers" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
