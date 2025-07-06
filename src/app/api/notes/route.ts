import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { getSessionUser } from "@/lib/getSessionUser";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content } = await req.json();

  await dbConnect();
  const note = await Note.create({ title, content, userId: user._id });

  return NextResponse.json(note, { status: 201 });
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const notes = await Note.find({ userId: user._id });

  return NextResponse.json(notes);
}
