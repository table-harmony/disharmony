import { isValidObjectId } from "@/lib/utils";
import { EditRoomForm } from "./form";
import { notFound } from "next/navigation";
import { getRoom } from "@/use-cases/rooms";

export default async function EditRoomPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const valid = isValidObjectId(searchParams.id);

  if (!valid) notFound();

  const room = await getRoom({ id: searchParams.id });

  if (!room) notFound();

  return (
    <div className="container relative md:max-w-lg space-y-6 py-2 md:py-10">
      <h1 className="text-xl font-medium md:text-3xl text-center">Edit room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
