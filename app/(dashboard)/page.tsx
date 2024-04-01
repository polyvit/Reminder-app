import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<Fallback />}>
      <WelcomeMessage />
    </Suspense>
  );
}

async function WelcomeMessage() {
  const user = await currentUser();

  if (!user) return <div>Error</div>;

  return (
    <div className="flex w-full">
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
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px] my-4" />
        <Skeleton className="w-[250px] h-[36px]" />
      </h1>
    </div>
  );
}
