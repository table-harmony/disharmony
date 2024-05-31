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
import { createRoomAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";
import { PenIcon } from "lucide-react";

const schema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
});

export function CreateRoomForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    startTransition(() => {
      createRoomAction(values)
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
            icon={PenIcon}
            type="submit"
            className="w-full"
          >
            Create
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
