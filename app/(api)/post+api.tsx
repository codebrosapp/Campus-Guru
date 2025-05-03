import { pool } from "@/configs/NilePostgresConfig";

export async function POST(request: Request) {
  const { content, imageUrl, visibleIn, email } = await request.json();

  try {
    const result = await pool.query(
      `INSERT INTO post (content, imageurl, visiblein, createon, createdby)
       VALUES ($1, $2, $3, DEFAULT, $4)
       RETURNING *`,
      [content, imageUrl, visibleIn, email]
    );

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Post insertion error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function GET(request: Request) {
  const url = new URL(request.url);
  const visibleIn = url.searchParams.get("visibleIn") || "Public";  // Default to 'Public'
  const orderField = url.searchParams.get("orderField") || "id";  // Default to 'id'

  // Whitelist allowed order fields to avoid SQL injection
  const allowedFields = ["id", "createon", "content"];
  const safeOrderField = allowedFields.includes(orderField) ? orderField : "id";

  // To handle multiple visibleIn values, we can use an array
  const validVisibleInValues = ["Public", "SRC", "COMHSSA", "NUENSA", "COSSA"];

  const safeVisibleIn = validVisibleInValues.includes(visibleIn) ? visibleIn : "Public"; // Defaults to 'Public' if invalid

  try {
    const result = await pool.query(
      `SELECT * FROM post
       INNER JOIN users ON post.createdby = users.email
       WHERE visiblein = $1
       ORDER BY post.${safeOrderField} DESC`,
      [safeVisibleIn]  // Use the dynamic value safely
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Fetch posts error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
