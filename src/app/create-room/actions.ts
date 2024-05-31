"use server";

import { Room } from "@prisma/client";
import { createRoom } from "@/use-cases/rooms";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized!" };

  await createRoom({ ...roomData, userId: user.id });

  return redirect("/settings");
}
