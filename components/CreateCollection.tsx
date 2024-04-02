"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionForm from "./CreateCollectionForm";

const CreateCollection = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const toggleFormHandler = (open: boolean) => setFormOpen(open);

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-red-800 to-pink-400 p-[1px]">
      <Button
        onClick={() => setFormOpen(true)}
        variant="outline"
        className="w-full dark:bg-neutral-950 bg-white"
      >
        <span className="bg-gradient-to-r from-red-800 to-pink-400 hover:to-pink-600 text-transparent bg-clip-text">
          Create collection
        </span>
      </Button>
      <CreateCollectionForm open={formOpen} toggleForm={toggleFormHandler} />
    </div>
  );
};

export default CreateCollection;
