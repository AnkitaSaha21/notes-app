"use client";

import { useState } from "react";
import { Note } from "@/types/note";

type NoteListProps = {
  notes: Note[];
  onNoteUpdated: (note: Note) => void;
  onNoteDeleted: (id: string) => void;
};

export default function NoteList({ notes, onNoteUpdated, onNoteDeleted }: NoteListProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const startEdit = (note: Note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async () => {
    if (!editId) return;

    const res = await fetch(`/api/notes/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });

    if (res.ok) {
      const updatedNote: Note = await res.json();
      onNoteUpdated(updatedNote); // ✅ reflect updated note
      cancelEdit();
    }
  };

  const deleteNote = async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (res.ok) {
      onNoteDeleted(id); // ✅ remove from list
    }
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note._id} className="border rounded p-4 bg-white shadow">
          {editId === note._id ? (
            <>
              <input
                className="border p-2 w-full mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="border p-2 w-full mb-2"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded">
                  Save
                </button>
                <button onClick={cancelEdit} className="bg-gray-300 px-3 py-1 rounded">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEdit(note)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
