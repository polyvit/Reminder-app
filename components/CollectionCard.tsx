"use client";
import { Collection, Task } from "@prisma/client";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Color, Colors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteCollectionAction } from "@/actions/collection";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export interface ICollectionCard {
  collection: Collection & {
    tasks: Task[];
  };
}

const CollectionCard: React.FC<ICollectionCard> = ({ collection }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tasks = collection.tasks;

  const removeCollection = async () => {
    setIsLoading(true);
    try {
      await deleteCollectionAction(collection.id);
      toast({
        title: "Success",
        description: "Collection was deleted",
      });
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <CollapsibleTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "flex w-full p-6 justify-between",
            Colors[collection.color as Color],
            isOpen && "rounded-b-none"
          )}
        >
          <span className="text-white font-bold">{collection.name}</span>
          {isOpen && <CaretDownIcon className="h-6 w-6" />}
          {!isOpen && <CaretUpIcon className="h-6 w-6" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-b-md dark:bg-neutral-900 shadow-lg">
        {tasks.length === 0 && <div>No tasks</div>}
        {tasks.length && (
          <>
            <Progress className="rounded-none" value={45} />
            <div className="flex flex-col p-4 gap-3">
              {tasks.map((task) => (
                <div key={task.id}>{task.content}</div>
              ))}
            </div>
          </>
        )}
        <Separator />
        <footer className="flex justify-between items-center h-[40px] px-4 p-[2px] text-xs text-neutral-500">
          <p>Created at {collection.createdAt.toLocaleDateString("ru-RU")}</p>
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <div>
              <Button size={"icon"} variant={"ghost"}>
                <PlusIcon />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <TrashIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>
                    Are you sure you want to delete?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your collections and all tasks.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={removeCollection}>
                      Proceed
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </footer>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollectionCard;