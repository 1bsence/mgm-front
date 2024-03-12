"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import "@/styles/globals.css";

function handleSignUp() {}

const local_endpoint = process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;
const production_endpoint = process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT;
const local_app_url = process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const production_app_url = process.env.NEXT_PUBLIC_PRODUCTION_APP_URL;

const endpoint =
  process.env.NODE_ENV === "development" ? local_endpoint : production_endpoint;
const app_url =
  process.env.NODE_ENV === "development" ? local_app_url : production_app_url;

export default function EmployeeSignUpPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const orgID = pathname.split("/")[4];
  const orgName = searchParams.get("name");

  const [emailError, setEmaiilError] = useState(false);
  const [passsError, setPassError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      if (typeof window !== "undefined") {
        console.log("Setting local storage", loggedIn);
        localStorage.setItem("userData", loggedIn);
        redirect("/");
      }
    }
  }, [loggedIn, emailError, passsError]);



  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <div className="bg-primary text-secondary h-100 rounded-lg shadow-lg bg-foreground">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <h3 className="flex justify-center">Organization: {orgName}</h3>
        </div>

        <form
          className="form-style"
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              if (
                e.target.elements.password.value !==
                e.target.elements.pass2word.value
              ) {
                setPassError("Passwords do not match");
                return;
              }
              const formData = {
                employee: {
                  name: e.target.elements.name.value,
                  email: e.target.elements.email.value,
                  password: e.target.elements.password.value,
                },
              };
              const req = fetch(`${endpoint}/signup/${orgID}`, {
                method: "POST",
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify(formData),
              }).catch((error) => {
                console.error(error);
                setEmaiilError(true);
              });
              req.then((res) => {
                if (res.ok) {
                  res.json().then((data) => {
                    setLoggedIn(JSON.stringify(data));
                  });
                } else {
                  if (res) {
                    console.error(
                      res.status == 409 ? "User exists" : res.statusText
                    );
                    setEmaiilError("Invalid credentials: " + res.statusText);
                    console.log(res.status.id);
                  }
                }
              });
            })
          }
        >
          <input
            required={true}
            className="input-field-style"
            type="text"
            name="name"
            placeholder="Name"
          />
          {emailError && <h5>User exists with that email</h5>}
          <input
            required={true}
            className="input-field-style"
            type="email"
            name="email"
            placeholder="E-mail"
          />
          {passsError ? (
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
          <button className={"btn-style " + " rounded-md"} type="submit">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
