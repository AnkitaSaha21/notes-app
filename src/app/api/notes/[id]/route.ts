import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { getSessionUser } from "@/lib/getSessionUser";

// ✅ PUT handler with correct parameter typing
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();
  await dbConnect();

  const updated = await Note.findOneAndUpdate(
    { _id: context.params.id, userId: user._id },
    { title, content },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// ✅ DELETE handler with correct parameter typing
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const deleted = await Note.findOneAndDelete({
    _id: context.params.id,
    userId: user._id,
  });

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Note deleted" });
}
