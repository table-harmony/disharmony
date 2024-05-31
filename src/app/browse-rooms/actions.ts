"use server";

import db from "@/db";
import { validateRequest } from "@/lib/auth";
import { getRoom } from "@/use-cases/rooms";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(
  id: string,
  data: { name: string; description: string }
) {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized!" };

  const room = await getRoom({ id });

  if (!room) return { error: "Room not found!" };

  if (room.userId !== user.id) return { error: "You are not the room owner!" };

  await db.room.update({
    where: { id },
    data: { name: data.name, description: data.description },
  });

  revalidatePath("/rooms");

  return redirect("/browse-rooms");
}

export async function deleteRoomAction(id: string) {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized!" };

  const room = await getRoom({ id });

  if (!room) return { error: "Room not found!" };

  if (room.userId !== user.id) return { error: "You are not the room owner!" };

  await db.room.delete({
    where: { id },
  });

  revalidatePath("/rooms");

  return { success: "Room was successfully updated!" };
}
