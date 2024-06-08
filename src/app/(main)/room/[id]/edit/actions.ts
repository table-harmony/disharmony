"use server";

import db from "@/db";

import { getRoom } from "@/infrastructure/rooms";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ActionError, authenticatedAction } from "@/lib/safe-action";
import { isValidObjectId } from "@/lib/utils";

import { editRoomSchema } from "./validation";

export const editRoomAction = authenticatedAction(
  editRoomSchema,
  async ({ id, name, description }, { user }) => {
    if (!isValidObjectId(id)) throw new ActionError("Invalid room ID");

    const room = await getRoom({ id });

    if (!room) throw new ActionError("Room not found!");

    if (room.userId !== user.id)
      throw new ActionError("You are not the room owner!");

    await db.room.update({
      where: { id },
      data: { name, description },
    });

    revalidatePath("/rooms");

    return redirect("/browse-rooms");
  },
);
