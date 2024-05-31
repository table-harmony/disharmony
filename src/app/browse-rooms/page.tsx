import { getRoomsByQuery } from "@/use-cases/rooms";

import { Toolbar } from "@/components/toolbar";
import { RoomCard } from "@/components/room";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BrowseRoomsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const { user } = await validateRequest();

  if (!user) redirect("/");

  const query = searchParams?.query || "";
  const rooms = await getRoomsByQuery({ query });

  return (
    <div className="container lg:px-20 pt-12 pb-24 md:py-20 space-y-10 flex flex-col">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance text-center">
          Our rooms
        </h1>
        <p className="max-w-[750px] text-center text-muted-foreground text-sm">
          Search, Interact and socialize with other people in our rooms.
        </p>
      </div>
      <Toolbar />
      {rooms.map((room) => (
        <RoomCard key={room.id} {...room} edit={room.userId === user.id} />
      ))}
    </div>
  );
}
