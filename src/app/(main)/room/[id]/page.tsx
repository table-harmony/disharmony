import { getRoom, getRooms } from "@/infrastructure/rooms";
import { VideoPlayer } from "./video-player";
import { notFound } from "next/navigation";
import { isValidObjectId } from "@/lib/utils";

export async function generateStaticParams() {
  const rooms = await getRooms();

  return rooms.map((room) => ({
    id: room.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const valid = isValidObjectId(params.id);

  if (!valid) notFound();

  const room = await getRoom({ id: params.id });

  if (!room) notFound();

  return {
    title: room.name,
    description: room.description,
  };
}

export default async function RoomPage({ params }: { params: { id: string } }) {
  const valid = isValidObjectId(params.id);

  if (!valid) notFound();

  const room = await getRoom({ id: params.id });

  if (!room) notFound();

  return <VideoPlayer room={room} />;
}
