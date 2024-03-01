"use client";


import Image from "next/image";
import { useState } from "react";
import logoImg from "@/public/logo-black-removebg-preview.png";
function handleSignUp() {}
export default function Login() {
  // Get the value from local storage if it exists
  if (typeof window !== "undefined") {
    var userEmailVal = localStorage.getItem("userEmail") || "";
    var userPasswordVal = localStorage.getItem("userPassword") || "";
  }
  // Set the value received from the local storage to a local state
  const [userEmail, setUserEmail] = useState(userEmailVal);
  const [userPassword, setUserPassword] = useState(userPasswordVal);

  // When user submits the form, save the favorite number to the local storage
  function saveToLocalStorage(object) {
    if (typeof window !== "undefined") {
      localStorage.setItem("userEmail", object.email);
      localStorage.setItem("userPassword", object.password);
    }
  }
  function deleteFromLocalStorage() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
      console.log(localStorage.getItem("userEmail"));
      console.log(localStorage.getItem("userPassword"));
    }
  }

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
              console.log(formData);
              const data = fetch("http://localhost:3030/id", {
                method: "GET",
                mode: "no-cors", // Dont enable CORS
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*", // @dev First, read about security
                },
              }).catch((error) => console.error(error));
              if (data) {
                console.log("Data received");
                console.log(data);
                saveToLocalStorage(formData);
                console.log("Data saved to local storage");
                console.log(localStorage.getItem("userEmail"));
                console.log(localStorage.getItem("userPassword"));
              }
            })
          }
        >
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
          <button
            onClick={deleteFromLocalStorage}
            className="rounded-md w-20 shadow-lg h-8 hover:shadow-inner"
            type="submit"
          >
            delete
          </button>
        </form>
      </div>
    </div>
  );
}
