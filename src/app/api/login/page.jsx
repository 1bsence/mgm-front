"use client";
import Image from "next/image";
import logoImg from "@/public/logo-black-removebg-preview.png";
function handleLogin() {}

export default function LoginPage() {
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="bg-white h-60 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={50} height={50} />
          </div>
          <h3 className="flex justify-center">Return of MGM</h3>
        </div>

        <div>
          <form
            className="flex flex-col justify-center items-center space-y-2 p-4 h-full w-full "
            onSubmit={
              (handleLogin = (e) => {
                e.preventDefault();
                const email = e.target.elements.email.value;
                const password = e.target.elements.password.value;
                const formData = {
                  email,
                  password,
                };
                console.log(formData);
                try {
                  fetch("https://5bgmxcmd-3000.euw.devtunnels.ms/api/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  });
                } catch (e) {
                  console.log(e);
                }
              })
            }
          >
            <input
              className="rounded-md shadow-md hover:shadow-inner"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="rounded-md shadow-md hover:shadow-inner"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              className="rounded-md w-20 shadow-lg  h-8 hover:shadow-inner"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}