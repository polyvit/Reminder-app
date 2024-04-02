import CreateCollection from "@/components/CreateCollection";
import FrownFace from "@/components/icons/FrownFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMessage() {
  const user = await currentUser();

  if (!user) return <div>Error</div>;

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome,
        <br />
        {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

function Fallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px] my-4" />
        <Skeleton className="w-[250px] h-[36px]" />
      </h1>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
  });
  if (!collections.length) {
    return (
      <div className="flex flex-col gap-5 ">
        <Alert>
          <FrownFace />
          <AlertTitle>No collections in the db</AlertTitle>
          <AlertDescription>Create your first collection</AlertDescription>
        </Alert>
        <CreateCollection />
      </div>
    );
  }
  return (
    <div>
      Collections: {collections.length}
      <CreateCollection />
    </div>
  );
}
