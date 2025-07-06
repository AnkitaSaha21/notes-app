"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import type { Note } from "@/types/note";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") redirect("/login");

    const fetchNotes = async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    };

    if (status === "authenticated") {
      fetchNotes();
    }
  }, [status]);

  const handleNoteAdded = (newNote: Note) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleNoteUpdated = (updatedNote: Note) => {
    setNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  const handleNoteDeleted = (id: string) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      <NoteForm onNoteAdded={handleNoteAdded} />
      <NoteList
        notes={notes}
        onNoteUpdated={handleNoteUpdated}
        onNoteDeleted={handleNoteDeleted}
      />
    </div>
  );
}
