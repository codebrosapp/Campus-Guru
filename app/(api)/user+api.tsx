import { pool } from "@/configs/NilePostgresConfig";

// POST: Insert user into the database
export async function POST(request: Request) {
  const { name, email, image } = await request.json();
  console.log(name, email, image); // Log input data to debug

  try {
    // Insert user into the users table
    await pool.query(
      `INSERT INTO users (name, email, image) VALUES ($1, $2, $3)`,
      [name, email, image]
    );
    return Response.json({ success: true });
  } catch (e) {
    console.error("POST error:", e);
    return Response.json({ error: "Failed to insert user" }, { status: 500 });
  }
}

// GET: Fetch user based on email
export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email");

  if (!email) {
    return Response.json({ error: "Email query param missing" }, { status: 400 });
  }

  try {
    // Query the users table for the user with the provided email
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return Response.json(result.rows[0] || {});
  } catch (e) {
    console.error("GET error:", e);
    return Response.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
