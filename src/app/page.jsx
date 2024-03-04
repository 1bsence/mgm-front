"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState(() => {
    const userString = localStorage.getItem("userData");
    return userString ? JSON.parse(userString) : null;
  });
  useEffect(() => {
    // Logic to determine if a redirect is needed
    if (!userData) {
      redirect("/login");
    }
  }, [userData]);
  if (!userData) {
    return <>NO USER DATA</>;
  } else {
    return (
      <>
        Welcome {JSON.stringify(userData)}
        <button
          onClick={() => {
            localStorage.removeItem("userData");
            setUserData(null);
          }}
        >
          DELETE USER
        </button>
      </>
    );
  }
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
