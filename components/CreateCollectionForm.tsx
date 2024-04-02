import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useForm, SubmitHandler } from "react-hook-form";
import { SchemaType, createCollectionSchema } from "@/schema/createCollection";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Color, Colors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createCollectionAction } from "@/actions/collection";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface ICreateCollectionProps {
  open: boolean;
  toggleForm(open: boolean): void;
}

const CreateCollectionForm: React.FC<ICreateCollectionProps> = ({
  open,
  toggleForm,
}) => {
  const form = useForm<SchemaType>({
    defaultValues: {},
    resolver: zodResolver(createCollectionSchema),
  });
  const watchColor = form.watch("color");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<SchemaType> = async (data: SchemaType) => {
    try {
      await createCollectionAction(data);
      onOpenChangeHandler(false);
      router.refresh();
      toast({
        title: "Success",
        description: "Collection was created",
      });
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
    toggleForm(open);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChangeHandler}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>You need it to group tasks</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Business" {...field} />
                  </FormControl>
                  <FormDescription>Collection name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          "w-full h-8 dark:text-white",
                          Colors[field.value as Color]
                        )}
                      >
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(Colors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              "w-full h-8 rounded-md my-1 text-white focus:text-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8",
                              Colors[color as Color]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select the color you like</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant="outline"
            className={watchColor && Colors[form.getValues("color") as Color]}
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
            {form.formState.isSubmitting && (
              <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCollectionForm;
