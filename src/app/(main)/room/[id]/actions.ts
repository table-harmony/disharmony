"use server";

import { env } from "@/env";
import { validateRequest } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized!");

  const serverClient = StreamChat.getInstance(
    env.NEXT_PUBLIC_STREAM_API_KEY,
    env.STREAM_SECRET
  );

  const token = serverClient.createToken(user.id);
  return token;
}
