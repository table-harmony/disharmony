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
    <div className="container flex flex-col space-y-10 pb-24 pt-12 md:py-20 lg:px-20">
      <div className="flex flex-col items-center">
        <h1 className="text-balance text-center text-2xl font-bold md:text-3xl lg:text-4xl">
          Our rooms
        </h1>
        <p className="max-w-[750px] text-center text-sm text-muted-foreground">
          Search, Interact and socialize with other people in our rooms.
        </p>
      </div>
      <Toolbar />
      {rooms.length === 0 ? (
        <div className="grid items-center justify-center">
          No rooms available
        </div>
      ) : (
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} {...room} edit={room.userId === user.id} />
          ))}
        </div>
      )}
    </div>
  );
}
