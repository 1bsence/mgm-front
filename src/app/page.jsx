"use client";

import { redirect } from "next/navigation";

export default function Home() {
  // Logic to determine if a redirect is needed

  // Define other routes and logic
  if (typeof window !== "undefined") {
    var email = localStorage.getItem("userEmail");
    var password = localStorage.getItem("userPassword");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold text-blue-600">Return of MGM</div>
      <div>Profile Page</div>
      {email && <h1>User Email: {email}</h1>}
      {password && <h1>User Password: {password}</h1>}
    </div>
  );
}
