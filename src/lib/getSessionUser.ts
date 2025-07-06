import { getServerSession } from "next-auth";

import dbConnect from "./db";
import User from "@/models/User";
import { authOptions } from "./auth";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  return user;
}
