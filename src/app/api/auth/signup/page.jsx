"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
import { useState, useEffect } from "react";
function handleSignUp() {}

export default function SignUpPage() {
  const [error, setError] = useState(false);

  useEffect(() => {}, [error]);
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="bg-white h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <h3 className="flex justify-center">Return of MGM</h3>
        </div>

        <form
          className="flex flex-col justify-center items-center space-y-2 p-4 h-full w-full "
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const name = e.target.elements.name.value;
              const email = e.target.elements.email.value;
              const password = e.target.elements.password.value;
              const organization_name =
                e.target.elements.organizationName.value;
              const organization_address =
                e.target.elements.headquartersAddress.value;
              const employee = {
                name,
                email,
                password,
              };
              const organization = {
                organization_name,
                organization_address,
              };
              console.log(organization, employee);
              console.log(JSON.stringify({ organization, employee }));
              const req = fetch("http://localhost:3030/signup", {
                method: "POST", // Dont enable CORS
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify({ organization, employee }),
              }).catch((error) => console.error(error));
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
            className="rounded-md shadow-md hover:shadow-inner"
            type="text"
            name="name"
            placeholder="Name"
          />
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
          <input
            className="rounded-md shadow-md hover:shadow-inner"
            type="password"
            name="pass2word"
            placeholder="Repeat Password"
          />
          <input
            className="rounded-md shadow-md hover:shadow-inner"
            type="text"
            name="organizationName"
            placeholder="Organization Name"
          />
          <input
            className="rounded-md shadow-md hover:shadow-inner"
            type="text"
            name="headquartersAddress"
            placeholder="Headquarter Address"
          />
          <button
            className="rounded-md w-20 shadow-lg h-8 hover:shadow-inner"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}