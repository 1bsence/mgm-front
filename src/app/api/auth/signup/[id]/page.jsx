"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
import { useState, useEffect } from "react";
function handleSignUp() {}
const inputStyle =
  "text-secondary placeholder:text-secondary rounded-md shadow-md hover:shadow-inner px-2 py-1 w-48 h-8";
const btnStyle =
  "text-secondary bg-accent1 hover:bg-accent2 rounded-md w-20 shadow-md h-8 hover:shadow-inner px-2 py-1";
const formStyle =
  "flex flex-col justify-center items-center space-y-2 p-4 h-full w-full px-4 py-4";

export default function EmployeeSignUpPage() {
  const [OrganizationId, setOrganizationId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    return user.organization.id;
  });
  const [error, setError] = useState(false);
  useEffect(() => {}, [OrganizationId, error]);
  return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <div className="bg-primary text-secondary h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <h3 className="flex justify-center">
            Organization: {OrganizationId}
          </h3>
        </div>

        <form
          className={formStyle}
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const name = e.target.elements.name.value;
              const email = e.target.elements.email.value;
              const password = e.target.elements.password.value;
              if (
                e.target.elements.password.value !==
                e.target.elements.pass2word.value
              ) {
                setError("Passwords do not match");
                return;
              }
              const formData = { employee: { name, email, password } };
              const req = fetch(
                `http://localhost:3030/signup/${OrganizationId}`,
                {
                  method: "POST",
                  headers: {
                    accept: "application/json",
                  },
                  body: JSON.stringify(formData),
                }
              ).catch((error) => console.error(error));
              req.then((res) => {
                if (res.ok) {
                  console.log(
                    "User created successfully",
                    res.status,
                    res.statusText
                  );
                  res.json().then((data) => {
                    console.log(data);
                  });
                } else {
                  if (res.status === 409) {
                    console.error(
                      "User already exists with that email",
                      res.status,
                      res.statusText
                    );
                    setError("User already exists with that email");
                  }
                }
              });
            })
          }
        >
          <input
            className={inputStyle}
            type="text"
            name="name"
            placeholder="Name"
          />
          {error && (
            <h5 className="text-red-600">User exists with that email</h5>
          )}
          <input
            className={inputStyle}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          {error ? (
            <h5 className="text-red-600">Passwords do not match</h5>
          ) : null}
          <input
            className={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
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
