"use client";

import { useState } from "react";
import { Note } from "@/types/note";

type NoteFormProps = {
  onNoteAdded: (note: Note) => void;
};

export default function NoteForm({ onNoteAdded }: NoteFormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      const newNote: Note = await res.json();
      onNoteAdded(newNote);
      setTitle("");
      setContent("");
    } else {
      alert("Failed to create note");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6">
      <h2 className="text-xl font-semibold mb-2">New Note</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full p-2 mb-2"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border w-full p-2 mb-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Note
      </button>
    </form>
  );
}
