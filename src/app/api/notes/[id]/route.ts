import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { getSessionUser } from "@/lib/getSessionUser";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
  }

  await dbConnect();

  const updated = await Note.findOneAndUpdate(
    { _id: params.id, userId: user._id },
    { title, content },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const deleted = await Note.findOneAndDelete({
    _id: params.id,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Note deleted" });
}
