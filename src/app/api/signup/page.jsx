"use client";
import Image from "next/image";
import logoImg from "../../../../public/logo-black-removebg-preview.png";
function handleSignUp() {}

export default function SignUpPage() {
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="bg-white h-100 rounded-lg shadow-lg">
        <div className="rounded-md flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src={logoImg} alt="logo" width={50} height={50} />
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
              const organizationName = e.target.elements.organizationName.value;
              const headquartersAddress =
                e.target.elements.headquartersAddress.value;
              const formData = {
                name,
                email,
                password,
                organizationName,
                headquartersAddress,
              };
              console.log(formData);
              try {
                fetch("https://5bgmxcmd-3000.euw.devtunnels.ms/api/signup", {
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
          <inpu
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

