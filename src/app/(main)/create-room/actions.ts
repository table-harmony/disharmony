"use server";

import { createRoom } from "@/infrastructure/rooms";

import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";
import { createRoomSchema } from "./validation";

export const createRoomAction = authenticatedAction(
  createRoomSchema,
  async ({ name, description }, { user }) => {
    await createRoom({ userId: user.id, name, description });

    return redirect("/browse-rooms");
  },
);
