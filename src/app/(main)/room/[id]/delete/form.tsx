"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";

import { deleteRoomAction } from "./actions";
import { deleteRoomSchema as schema } from "./validation";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";
import { TrashIcon } from "lucide-react";

interface DeleteRoomProps {
  id: string;
}

export function DeleteRoomForm({ id }: DeleteRoomProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { id },
  });

  const { execute, status } = useAction(deleteRoomAction, {
    onError(error) {
      toast({ variant: "destructive", description: error.serverError });
    },
  });

  return (
    <form onSubmit={form.handleSubmit(execute)}>
      <LoaderButton
        isLoading={status === "executing"}
        icon={TrashIcon}
        type="submit"
        variant="destructive"
        className="w-full"
      >
        Delete
      </LoaderButton>
    </form>
  );
}
