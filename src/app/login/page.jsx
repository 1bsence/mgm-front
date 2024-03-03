"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoImg from "@/public/logo-black-removebg-preview.png";

export default function Login() {
  function handleSignUp() {}
  function getFromLocalStorage() {
    var userEmailVal = localStorage.getItem("userEmail") || "";
    var userPasswordVal = localStorage.getItem("userPassword") || "";
    console.log(userEmailVal);
    console.log(userPasswordVal);
  }
  function saveToLocalStorage(object) {
    localStorage.setItem("userEmail", object.email);
    localStorage.setItem("userPassword", object.password);
    console.log("Data saved to local storage");
    console.log(localStorage.getItem("userEmail"));
    console.log(localStorage.getItem("userPassword"));
  }
  function deleteFromLocalStorage() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    console.log(localStorage.getItem("userEmail"));
    console.log(localStorage.getItem("userPassword"));
  }
  // const getFromLocalStorage = () => {};
  // const saveToLocalStorage = () => {};
  var userEmailVal = "";
  var userPasswordVal = "";
  // Get the value from local storage if it exists
  // Set the value received from the local storage to a local state
  const [userEmail, setUserEmail] = useState(userEmailVal);
  const [userPassword, setUserPassword] = useState(userPasswordVal);

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
              const data = fetch("http://localhost:3030/seecon", {
                method: "POST", // Dont enable CORS
                headers: {
                  accept: "application/json",
                },
                body: JSON.stringify({ id: "Organizations" }),
              }).catch(function (error) {
                console.log(
                  "There was a problem with the fetch operation: " +
                    error.message
                );
              });
              data.then((response) => {
                if (response.ok) {
                  console.log("Response is ok");
                  response.json().then((data) => {
                    console.log(data);
                  });
                } else {
                  console.log("Response is not ok");
                }
              });
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
