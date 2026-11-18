import { createClient } from "@supabase/supabase-js";

// These come from environment variables. They never reach the browser,
// because this file only runs on the server.
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// GET /api/notes  -> return the latest notes
export async function GET() {
  const { data, error } = await supabase
    .from("notes")
    .select("id, text, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

// POST /api/notes  -> save a new note
export async function POST(request) {
  const body = await request.json();
  const text = (body.text || "").trim();

  // Never trust the browser: validate on the server too.
  if (!text || text.length > 280) {
    return Response.json({ error: "Note must be 1-280 characters." }, { status: 400 });
  }

  const { data, error } = await supabase.from("notes").insert({ text }).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { status: 201 });
}
