"use client";

import Image from "next/image";
import { React, useEffect, useState } from "react";
import logoImg from "@/public/logo-black-removebg-preview.png";
import { redirect } from "next/navigation";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      redirect("/");
    }
  }, [loggedIn]);

  function handleSignUp() {}
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="bg-white h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
        </div>
        <form
          className="flex flex-col justify-center items-center space-y-2 p-4 h-full w-full "
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const email = e.target.elements.email.value;
              const password = e.target.elements.password.value;
              const formData = {
                email,
                password,
              };
              const data = fetch("http://localhost:3030/login", {
                method: "POST", // Dont enable CORS
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify(formData),
              }).catch(function (error) {
                console.log(
                  "There was a problem with the fetch operation: " +
                    error.message
                );
              });
              data.then((response) => {
                if (response.ok) {
                  response.json().then((data) => {
                    var user = {
                      organization: data.organization,
                      employee: data.employee,
                    };
                    typeof window !== "undefined"
                      ? window.localStorage.setItem(
                          "userData",
                          JSON.stringify(user)
                        )
                      : false;
                    setLoggedIn(true);
                  });
                } else {
                  console.error(response.status, response.statusText);
                }
              });
            })
          }
        >
          {loggedIn ? (
            <>
              Logged
              {typeof window !== "undefined"
                ? window.localStorage.getItem("userData")
                : false}
            </>
          ) : null}
          <input
            className="rounded-md shadow-md hover:shadow-inner"
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <input
            className="rounded-md shadow-md hover:shadow-inner"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className="rounded-md w-20 shadow-lg h-8 hover:shadow-inner"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
