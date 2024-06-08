import db from "@/db";
import { Room } from "@prisma/client";

export async function createRoom(data: Omit<Room, "id">) {
  const room = await db.room.create({ data });
  return room;
}

export async function getRoom(data: { id: string }) {
  const room = await db.room.findUnique({ where: { id: data.id } });
  return room;
}

export async function getRooms() {
  const rooms = await db.room.findMany();
  return rooms;
}

export async function getRoomsByQuery(data: { query: string }) {
  const rooms = await db.room.findMany({
    where: {
      OR: [
        { name: { contains: data.query } },
        { description: { contains: data.query } },
      ],
    },
  });

  return rooms;
}
