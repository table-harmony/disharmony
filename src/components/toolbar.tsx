import Link from "next/link";
import { SearchRooms } from "./search-rooms";
import { Button } from "./ui/button";
import { PenIcon } from "lucide-react";

export function Toolbar() {
  return (
    <div className="flex justify-between gap-4">
      <SearchRooms />
      <Button asChild>
        <Link href="/create-room">
          <PenIcon className="mr-2 h-4 w-4" />
          Create room
        </Link>
      </Button>
    </div>
  );
}
