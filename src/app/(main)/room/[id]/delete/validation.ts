import { z } from "zod";

export const deleteRoomSchema = z.object({
  id: z.string(),
});
