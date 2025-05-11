import { pool } from "@/configs/NilePostgresConfig";

export async function POST(request: Request) {
  const { content, imageUrl, visibleIn, email } = await request.json();

  try {
    const result = await pool.query(
      `INSERT INTO post (content, imageurl, createon, createdby, club)
       VALUES ($1, $2, DEFAULT, $3, $4)
       RETURNING *`,
      [content, imageUrl, email, visibleIn]
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
  const clubParam = url.searchParams.get("club");
  const club: number | null = clubParam ? parseInt(clubParam, 10) : null;
  const orderField = url.searchParams.get("orderField") || "id";

  // Whitelist allowed order fields to avoid SQL injection
  const allowedFields = ["id", "createon", "content"];
  const safeOrderField = allowedFields.includes(orderField) ? orderField : "id";

  try {
    const result = await pool.query(
      `SELECT * FROM post
       INNER JOIN users ON post.createdby = users.email
       WHERE post.club = $1
       ORDER BY post.${safeOrderField} DESC`,
      [club] // Directly use the parsed integer 'club'
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
