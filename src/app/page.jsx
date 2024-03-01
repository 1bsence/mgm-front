"use client";

import { redirect } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // Logic to determine if a redirect is needed
  const [session, loading] = useSession();

  // Define other routes and logic

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold text-blue-600">Return of MGM</div>
      <div>Profile Page</div>
      {!session && <>No Sesion</>}
      {session && <>Signed In</>}
    </div>
  );
}
