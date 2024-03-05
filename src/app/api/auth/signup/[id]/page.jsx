"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

function handleSignUp() {}

const inputStyle =
  "text-secondary placeholder:text-secondary rounded-md shadow-md hover:shadow-inner px-2 py-1 w-48 h-8";
const btnStyle =
  "text-secondary bg-accent1 hover:bg-accent2 rounded-md w-20 shadow-md h-8 hover:shadow-inner px-2 py-1";
const formStyle =
  "flex flex-col justify-center items-center space-y-2 p-4 h-full w-full px-4 py-4";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://atc-2024-mgm-fe-linux-web-app.azurewebsites.net";
const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://atc-2024-mgm-be-linux-web-app.azurewebsites.net";

export default function EmployeeSignUpPage() {
  const pathname = usePathname();
  const orgID = pathname.split("/")[4];
  const searchParams = useSearchParams();
  const orgName = searchParams.get("name");

  const Color = searchParams.get("color");
  const [userData, setUserData] = useState(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });
  const [emailError, setEmaiilError] = useState(false);
  const [passsError, setPassError] = useState(false);
  useEffect(() => {}, [userData, emailError, passsError]);
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <div className="bg-primary text-secondary h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <h3 className="flex justify-center">Organization: {orgName}</h3>
        </div>

        <form
          className={formStyle}
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
              const req = fetch(`${apiURL}/${orgID}`, {
                method: "POST",
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify(formData),
              }).catch((error) => console.error(error));
              req.then((res) => {
                if (res.ok) {
                  res.json().then((data) => {
                    setUserData(data);
                    console.log(data);
                  });
                } else {
                  if (res.status) {
                    console.error(res.status);
                    setEmaiilError("Invalid credentials: " + res.statusText);
                    console.log(res);
                  }
                }
              });
            })
          }
        >
          <input
            required={true}
            className={inputStyle}
            type="text"
            name="name"
            placeholder="Name"
          />
          {emailError && (
            <h5 className="text-red-600">User exists with that email</h5>
          )}
          <input
            required={true}
            className={inputStyle}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          {passsError ? (
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
          <button className={btnStyle} type="submit">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
