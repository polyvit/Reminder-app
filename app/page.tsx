import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <UserButton />
    </>
  );
}
