"use client";
import { Task } from "@prisma/client";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn, setColorForExpirationDay } from "@/lib/utils";

interface ITaskCard {
  task: Task;
}

const TaskCard: React.FC<ITaskCard> = ({
  task: { content, expiresAt, done },
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox className="w-5 h-5" checked={done} />
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
