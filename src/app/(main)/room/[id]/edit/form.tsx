"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";

import { editRoomAction } from "./actions";
import { editRoomSchema as schema } from "./validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";
import { SaveIcon } from "lucide-react";

interface EditRoomProps {
  id: string;
  name: string;
  description: string;
}

export function EditRoomForm({ id, name, description }: EditRoomProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { id, name, description },
  });

  const { execute, status } = useAction(editRoomAction, {
    onError(error) {
      toast({ variant: "destructive", description: error.serverError });
    },
  });

  return (
    <div className="container relative space-y-6 md:max-w-lg 2xl:max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(execute)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            disabled={status === "executing"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="TableHarmony" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            disabled={status === "executing"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Im watching a film, come join me"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton
            isLoading={status === "executing"}
            icon={SaveIcon}
            type="submit"
            className="w-full"
          >
            Save changes
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
