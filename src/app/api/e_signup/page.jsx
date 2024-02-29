"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
function handleSignUp() {}

export default function SignUpPage() {
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="bg-white h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} />
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
              const formData = {
                name,
                email,
                password,
                organizationName,
                headquartersAddress,
              };
              console.log(formData);
              try {
                fetch("http://192.168.1.185:3030/api/e_signup", {
                  method: "POST",
                  mode: "no-cors", // Dont enable CORS
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*", // @dev First, read about security
                  },
                  body: JSON.stringify(formData),
                })
                  .then((response) => response.json())
                  .then((json) => console.log(json))
                  .catch((error) => console.error(error));
              } catch (error) {
                console.error(error);
              }
            })
          }
        >
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

