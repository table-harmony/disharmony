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
import { LogInIcon, Settings, TrashIcon } from "lucide-react";

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
    <Card className="w-full md:max-w-sm">
      {edit && (
        <div className="-mb-4 flex">
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href={`/room/${id}/edit`}>
              <span className="sr-only">edit</span>
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" className="rounded-full">
            <Link href={`/room/${id}/delete`}>
              <span className="sr-only">delete</span>
              <TrashIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          <Link href={`/room/${id}`}>
            <LogInIcon className="mr-2 h-4 w-4" /> Join room
          </Link>
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Created by: {userId}</p>
      </CardFooter>
    </Card>
  );
}
