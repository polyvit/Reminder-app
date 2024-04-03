"use client";
import { Task } from "@prisma/client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn, setColorForExpirationDay } from "@/lib/utils";
import { setTaskDoneAction } from "@/actions/task";
import { useRouter } from "next/navigation";

interface ITaskCard {
  task: Task;
}

const TaskCard: React.FC<ITaskCard> = ({
  task: { content, expiresAt, done, id },
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onCheckedChangeHandler = async () => {
    setIsLoading(true);
    await setTaskDoneAction(id);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        className="w-5 h-5"
        checked={done}
        onCheckedChange={onCheckedChangeHandler}
        disabled={done || isLoading}
      />
      <label className={cn("text-sm font-mefium", done && "line-through")}>
        {content}
        {expiresAt && (
          <p
            className={cn(
              "text-xs text-neutral-500 dark:text-neutral-500 opacity-70",
              setColorForExpirationDay(expiresAt)
            )}
          >
            {format(expiresAt, "dd/MM/yyyy")}
          </p>
        )}
      </label>
    </div>
  );
};

export default TaskCard;
