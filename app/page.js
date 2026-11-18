"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  async function loadNotes() {
    const res = await fetch("/api/notes");       // browser -> our backend
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setNotes(data);
  }

  useEffect(() => { loadNotes(); }, []);

  async function addNote() {
    setError("");
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setText("");
    loadNotes();
  }

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "48px 20px" }}>
      <h1 style={{ fontSize: 40, margin: "0 0 4px" }}>Notes wall</h1>
      <p style={{ margin: "0 0 28px", color: "#5a6a68" }}>
        Anything you write here is saved in a real database and shown to every visitor.
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          maxLength={280}
          placeholder="Write a note"
          style={{ flex: 1, padding: "12px 14px", fontSize: 16, border: "1.5px solid #1d2b2a", borderRadius: 6, background: "#fff" }}
        />
        <button
          onClick={addNote}
          style={{ padding: "12px 18px", fontSize: 16, background: "#1d4d4a", color: "#fff", border: 0, borderRadius: 6, cursor: "pointer" }}
        >
          Post note
        </button>
      </div>

      {error && <p style={{ color: "#a3261b" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: 28 }}>
        {notes.length === 0 && <li style={{ color: "#5a6a68" }}>No notes yet. Post the first one.</li>}
        {notes.map((n) => (
          <li key={n.id} style={{ padding: "14px 0", borderTop: "1px solid #cfc9bb" }}>
            <div style={{ fontSize: 18 }}>{n.text}</div>
            <div style={{ fontSize: 13, color: "#7a8584", marginTop: 4 }}>
              {new Date(n.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
