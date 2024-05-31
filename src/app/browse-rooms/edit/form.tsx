"use client";

import { z } from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editRoomAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";
import { SaveIcon } from "lucide-react";
import { Room } from "@prisma/client";

const schema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
});

export function EditRoomForm({ room }: { room: Room }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: room.name,
      description: room.description,
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    startTransition(() => {
      editRoomAction(room.id, values)
        .then((data) => {
          if (data?.error)
            toast({ variant: "destructive", description: data.error });
        })
        .catch(() =>
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
        );
    });
  };

  return (
    <div className="container relative md:max-w-lg 2xl:max-w-xl space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="TableHarmony" />
                </FormControl>
                <FormDescription>
                  This is your public room name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Im watching a film, come join me"
                  />
                </FormControl>
                <FormDescription>Please describe the room.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton
            isLoading={isPending}
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
