"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  var user = "";
  var userString = "";
  useEffect(() => {
    // Logic to determine if a redirect is needed
    userString = localStorage.getItem("userData1");
    user = userString ? JSON.parse(userString) : null;
    console.log(user, "user");
  }, []);
  if (!user) {
    redirect("/login");
  }
  // Logic to determine if a redirect is
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold text-blue-600">Return of MGM</div>
      <div>Profile Page</div>
      //if user display user info
      {user?.employee && (
        <div>
          <div>{user.employee.name}</div>
          <div>{user.employee.email}</div>
        </div>
      )}
    </div>
  );
}
