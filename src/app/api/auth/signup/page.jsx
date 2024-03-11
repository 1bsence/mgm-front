"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@/styles/globals.css";

const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;

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
      <div className="h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <h3 className="flex justify-center">Return of MGM</h3>
        </div>

        <form
          className="form-style"
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const employee = {
                name: e.target.elements.name.value,
                email: e.target.elements.email.value,
                password: e.target.elements.password.value,
              };
              const organization = {
                name: e.target.elements.organizationName.value,
                address: e.target.elements.headquartersAddress.value,
              };
              if (
                e.target.elements.password.value !==
                e.target.elements.pass2word.value
              ) {
                setError(["password", "Passwords does not match!"]);
                return;
              }

              const req = fetch(`${endpoint}/signup`, {
                method: "POST",
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify({ organization, employee }),
              }).catch((error) => console.error(error));
              req.then((res) => {
                if (!res.ok) {
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
            className="input-field-style"
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            required={true}
            className="input-field-style"
            type="email"
            name="email"
            placeholder="E-mail"
          />
          {error ? (
            <h5 className="text-red-600">Passwords do not match</h5>
          ) : null}
          <input
            required={true}
            className="input-field-style"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            required={true}
            className="input-field-style"
            type="password"
            name="pass2word"
            placeholder="Repeat Password"
          />
          <input
            required={true}
            className="input-field-style"
            type="text"
            name="organizationName"
            placeholder="Organization Name"
          />
          <input
            required={true}
            className="input-field-style"
            type="text"
            name="headquartersAddress"
            placeholder="Headquarter Address"
          />
          <div>
            <button className={"btn-style" + " rounded-l-md"} type="submit">
              SignUp
            </button>
            <Link href={"/api/auth/login"}>
              <button className={"btn-style" + " rounded-r-md"}>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
