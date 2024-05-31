"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteRoomAction } from "./actions";
import { TrashIcon } from "lucide-react";

export function DeleteRoomForm({ id }: { id: string }) {
  const { toast } = useToast();

  const onSubmit = () => {
    deleteRoomAction(id)
      .then((data) => {
        if (data?.error)
          toast({ variant: "destructive", description: data.error });
        if (data?.success) toast({ description: data.success });
      })
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button asChild size="icon" variant="ghost" className="rounded-full">
          <span className="sr-only">delete</span>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the room remove the data from the
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
