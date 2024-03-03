"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
function handleSignUp() {}

const OrganizationId = "a5e4bf63-b31f-42c6-9f71-869ca4e8f566";

export default function EmployeeSignUpPage() {
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="bg-white h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={60} height={60} priority />
          </div>
          <h3 className="flex justify-center">
            Organization: {OrganizationId}
          </h3>
        </div>

        <form
          className="flex flex-col justify-center items-center space-y-2 p-4 h-full w-full "
          onSubmit={
            (handleSignUp = (e) => {
              e.preventDefault();
              const name = e.target.elements.name.value;
              const email = e.target.elements.email.value;
              const password = e.target.elements.password.value;

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
                  console.error(
                    "User creation failed",
                    res.status,
                    res.statusText
                  );
                }
              });
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
