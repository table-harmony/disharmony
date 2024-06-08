import { getRoom } from "@/infrastructure/rooms";

import { notFound } from "next/navigation";

import { isValidObjectId } from "@/lib/utils";
import { DeleteRoomForm } from "./form";

export default async function DeleteRoomPage({
  params,
}: {
  params: { id: string };
}) {
  const valid = isValidObjectId(params.id);
  if (!valid) notFound();

  const room = await getRoom({ id: params.id });
  if (!room) notFound();

  return (
    <div className="container relative space-y-6 py-2 md:max-w-lg md:py-10">
      <h1 className="text-center text-xl font-medium md:text-3xl">
        Delete room
      </h1>
      <DeleteRoomForm id={room.id} />
    </div>
  );
}
