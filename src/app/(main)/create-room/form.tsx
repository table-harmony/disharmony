"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";

import { createRoomAction } from "./actions";
import { createRoomSchema as schema } from "./validation";

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
import { PenIcon } from "lucide-react";

export function CreateRoomForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { execute, status } = useAction(createRoomAction, {
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
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton
            isLoading={status === "executing"}
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
