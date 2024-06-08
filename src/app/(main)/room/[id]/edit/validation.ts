import { z } from "zod";

export const editRoomSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
});
