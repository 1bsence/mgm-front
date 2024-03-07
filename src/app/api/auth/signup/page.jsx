"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
import Link from "next/link";
import { useState, useEffect } from "react";

const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://atc-2024-mgm-be-linux-web-app.azurewebsites.net";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mgm-front.vercel.app";

const inputStyle =
  "text-secondary placeholder:text-secondary rounded-md shadow-md hover:shadow-inner px-2 py-1 w-48 h-8";
const btnStyle =
  "text-secondary bg-accent1 hover:bg-accent2  w-20 shadow-md h-8 hover:shadow-inner px-2 py-1";
const formStyle =
  "flex flex-col justify-center items-center space-y-2 p-4 h-full w-full px-4 py-4";

function handleSignUp() {}

export default function SignUpPage() {
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("userData", JSON.stringify(loggedIn));
      redirect("/");
    }
  }, [loggedIn, error]);
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <div className="bg-primary text-secondary h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <h3 className="flex justify-center">Return of MGM</h3>
        </div>

        <form
          className={formStyle}
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const employee = {
                name: e.target.elements.name.value,
                email: e.target.elements.email.value,
                password: e.target.elements.password.value,
              };
              const organization = {
                organization_name: e.target.elements.organizationName.value,
                organization_address:
                  e.target.elements.headquartersAddress.value,
              };
              if (
                e.target.elements.password.value !==
                e.target.elements.pass2word.value
              ) {
                setError(["password", "Passwords does not match!"]);
                return;
              }

              const req = fetch(`${apiURL}/signup`, {
                method: "POST",
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify({ organization, employee }),
              }).catch((error) => console.error(error));
              req.then((res) => {
                if (!res.ok) {
                  console.error(
                    "User creation failed",
                    res.status,
                    res.statusText
                  );
                  setError(res.statusText);
                }
              });
            })
          }
        >
          {error ? (
            <div className="text-red-500">
              Email or Organization name already in use
            </div>
          ) : null}
          <input
          required={true}
            className={inputStyle}
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
          required={true}
            className={inputStyle}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          {error ? (
            <h5 className="text-red-600">Passwords do not match</h5>
          ) : null}
          <input
          required={true}
            className={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
          required={true}
            className={inputStyle}
            type="password"
            name="pass2word"
            placeholder="Repeat Password"
          />
          <input
          required={true}
            className={inputStyle}
            type="text"
            name="organizationName"
            placeholder="Organization Name"
          />
          <input
          required={true}
            className={inputStyle}
            type="text"
            name="headquartersAddress"
            placeholder="Headquarter Address"
          />
          <div>
            <button className={btnStyle + " rounded-l-md"} type="submit">
              SignUp
            </button>
            <Link href={url + "/api/auth/login"}>
              <button className={btnStyle + " rounded-r-md"}>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
