import { pool } from "@/configs/NilePostgresConfig";

export async function POST(request: Request) {
  try {
    const {
      eventName,    // corresponds to "name" in your table
      bannerUrl,    // "bannerurl"
      location,     // "location"
      link,         // "link"
      eventDate,    // "event_date"
      eventTime,    // "event_time"
      email         // "createdby"
    } = await request.json();

    const query = `
      INSERT INTO event (
        name, location, link, bannerurl, event_date, event_time, createdby, createdon
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, DEFAULT
      )
      RETURNING *;
    `;

    const values = [eventName, location, link, bannerUrl, eventDate, eventTime, email];

    const result = await pool.query(query, values);

    return new Response(JSON.stringify(result.rows[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error inserting event:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
