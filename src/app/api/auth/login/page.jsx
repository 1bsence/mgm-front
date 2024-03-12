"use client";

import Image from "next/image";
import { React, useEffect, useState } from "react";
import logoImg from "@/public/logo-black-removebg-preview.png";
import { redirect } from "next/navigation";
import Link from "next/link";
import "@/styles/globals.css";

const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;
console.log(
  endpoint,
  local_endpoint,
  production_endpoint,
  local_app_url,
  production_app_url
);
function Login() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [emailError, setEmaiilError] = useState(false);
  const [passsError, setPassError] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      if (typeof window !== "undefined") {
        console.log("Setting local storage", loggedIn);
        localStorage.setItem("userData", loggedIn);
        redirect("/");
      }
    }
  }, [loggedIn, emailError, passsError]);

  function handleSignUp() {}
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <div className="  h-100 rounded-lg shadow-md shadow-glow-type1 bg-foreground">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <div>
            <h3 className="flex justify-center">Return of MGM</h3>
          </div>
        </div>
        <form
          className="form-style"
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const formdata = {
                email: e.target.elements.email.value,
                password: e.target.elements.password.value,
              };
              const data = fetch(endpoint + "/login", {
                method: "POST", // Dont enable CORS
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify(formdata),
              }).catch(function (error) {
                console.log(
                  "There was a problem with the fetch operation: " +
                    error.message
                );
              });
              data.then((response) => {
                if (response.ok) {
                  response.json().then((data) => {
                    setLoggedIn(JSON.stringify(data));
                  });
                } else {
                  setPassError("Invalid credentials: " + response.statusText);
                }
              });
            })
          }
        >
          {emailError && <h4 className="text-red">{emailError}</h4>}
          <input
            required={true}
            className="input-field-style"
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <input
            required={true}
            className="input-field-style"
            type="password"
            name="password"
            placeholder="Password"
          />
          <div>
            <button className={"btn-style" + " rounded-l-md"} type="submit">
              Login
            </button>
            <Link href={"/api/auth/signup"}>
              <button className={"btn-style" + " rounded-r-md"}>SignUp</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;