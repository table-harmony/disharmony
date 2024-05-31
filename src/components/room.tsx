import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogInIcon, Settings } from "lucide-react";
import { DeleteRoomForm } from "@/app/settings/delete-room-form";

export function RoomCard({
  id,
  name,
  description,
  userId,
  edit,
}: {
  id: string;
  name: string;
  description: string;
  userId: string;
  edit?: boolean;
}) {
  return (
    <Card className="max-w-sm">
      {edit && (
        <div className="flex -mb-4">
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href={`/settings/edit?id=${id}`}>
              <span className="sr-only">edit</span>
              <Settings className="w-4 h-4" />
            </Link>
          </Button>
          <DeleteRoomForm id={id} />
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          <Link href={`/room/${id}`}>
            <LogInIcon className="mr-2 w-4 h-4" /> Join room
          </Link>
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Created by: {userId}</p>
      </CardFooter>
    </Card>
  );
}
