"use client";
import React from "react";
import { Collection } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Color, Colors } from "@/lib/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaType, createTaskSchema } from "@/schema/createTask";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { createTaskAction } from "@/actions/task";
import { useToast } from "@/components/ui/use-toast";

interface ICreateTaskModal {
  collection: Collection;
  open: boolean;
  setOpen(open: boolean): void;
}

const CreateTaskModal: React.FC<ICreateTaskModal> = ({
  collection,
  open,
  setOpen,
}) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<SchemaType> = async (data: SchemaType) => {
    try {
      await createTaskAction(data);
      toast({
        title: "Success",
        description: "Task was created",
      });
      onOpenChangeHandler(false);
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.log(e);
    }
  };

  const onOpenChangeHandler = (open: boolean) => {
    form.reset();
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            Add new task to collection:
            <span
              className={cn(
                "p-[1px] bg-clip-text text-transparent",
                Colors[collection.color as Color]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your task here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires At</FormLabel>
                    <FormDescription>
                      When should the task expire?
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="justify-start items-center text-left font-normal w-full"
                          >
                            <CalendarIcon className="mr-4" />
                            {field.value && format(field.value, "dd/MM/yyyy")}
                            {!field.value && <span>No expiration</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              "w-full text-white dark:text-white",
              Colors[collection.color as Color]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
