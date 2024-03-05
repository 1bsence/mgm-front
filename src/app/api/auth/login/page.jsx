"use client";

import Image from "next/image";
import { React, useEffect, useState } from "react";
import logoImg from "@/public/logo-black-removebg-preview.png";
import { redirect } from "next/navigation";
import Link from "next/link";

const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://atc-2024-mgm-be-linux-web-app.azurewebsites.net";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://atc-2024-mgm-fe-linux-web-app.azurewebsites.net";

const inputStyle =
  "text-secondary placeholder:text-secondary rounded-md shadow-md hover:shadow-inner px-2 py-1 w-48 h-8";
const btnStyle =
  "text-secondary bg-accent1 hover:bg-accent2 w-20 shadow-md h-8 hover:shadow-inner px-2 py-1";
const formStyle =
  "flex flex-col justify-center items-center space-y-2 p-4 h-full w-full px-4 py-4";
function Login() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("userData", loggedIn);
    }
  }, [loggedIn, error]);

  function handleSignUp() {}
  return (
    <div className="bg-secondary h-screen w-screen flex items-center justify-center">
      <div className="bg-primary text-secondary h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <div>
            <h3 className="flex justify-center">Return of MGM</h3>
          </div>
        </div>
        <form
          className={formStyle}
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const formData = {
                email: e.target.elements.email.value,
                password: e.target.elements.password.value,
              };
              const data = fetch(`${apiURL}/login`, {
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
                    setLoggedIn(JSON.stringify(data));
                  });
                } else {
                  setError("Invalid credentials: " + response.statusText);
                }
              });
            })
          }
        >
          {error && <h4 className="">{error}</h4>}
          <input
            required={true}
            className={inputStyle}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <input
            required={true}
            className={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
          />
          <div>
            <button className={btnStyle + " rounded-l-md"} type="submit">
              Login
            </button>
            <Link href={url + "/api/auth/signup"}>
              <button className={btnStyle + " rounded-r-md"}>SignUp</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;