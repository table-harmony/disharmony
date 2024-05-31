import { RoomCard } from "@/components/room";
import { Toolbar } from "@/components/toolbar";
import { getRoomsByQuery } from "@/use-cases/rooms";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const rooms = await getRoomsByQuery({ query });

  return (
    <div className="container lg:px-20 pt-12 pb-24 md:py-20 space-y-10 flex flex-col">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance text-center">
          Settings
        </h1>
        <p className="max-w-[750px] text-center text-muted-foreground text-sm">
          View and manage your account and rooms.
        </p>
      </div>
      <Toolbar />
      {rooms.map((room) => (
        <RoomCard key={room.id} {...room} edit={true} />
      ))}
    </div>
  );
}
