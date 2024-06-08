"use server";

import db from "@/db";

import { getRoom } from "@/infrastructure/rooms";

import { revalidatePath } from "next/cache";

import { ActionError, authenticatedAction } from "@/lib/safe-action";

import { deleteRoomSchema } from "./validation";
import { redirect } from "next/navigation";

export const deleteRoomAction = authenticatedAction(
  deleteRoomSchema,
  async ({ id }, { user }) => {
    const room = await getRoom({ id });

    if (!room) throw new ActionError("Room not found!");

    if (room.userId !== user.id)
      throw new ActionError("You are not the room owner!");

    await db.room.delete({ where: { id } });

    revalidatePath("/rooms");

    return redirect("/browse-rooms");
  },
);
