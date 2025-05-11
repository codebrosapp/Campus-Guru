import { pool } from "@/configs/NilePostgresConfig";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.clubId || !body.u_email) {
      return new Response(JSON.stringify({ message: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { clubId, u_email } = body;

    // Avoid crashing on duplicate follow
    await pool.query(
      `INSERT INTO clubfollowers (club_id, u_email)
       VALUES ($1, $2)
       ON CONFLICT (club_id, u_email) DO NOTHING`,
      [clubId, u_email]
    );

    return new Response(JSON.stringify({ message: "Followed or already followed" }), {
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


export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.clubId || !body.u_email) {
      return new Response(JSON.stringify({ message: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { clubId, u_email } = body;

    await pool.query(
      `DELETE FROM clubfollowers WHERE club_id = $1 AND u_email = $2`,
      [clubId, u_email]
    );

    return new Response(JSON.stringify({ message: "Unfollowed successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error unfollowing club:", error);
    return new Response(JSON.stringify({ message: "Error unfollowing club" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}



export async function GET(request: Request) {
  try {
    const u_email = new URL(request.url).searchParams.get("u_email");

    if (!u_email) {
      return new Response(JSON.stringify({ message: "Missing user email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await pool.query(
      `SELECT clubs.name, clubfollowers.* FROM clubs
       INNER JOIN clubfollowers ON clubs.id = clubfollowers.club_id
       WHERE clubfollowers.u_email = $1`,
      [u_email]  // ✅ parameter provided correctly
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
