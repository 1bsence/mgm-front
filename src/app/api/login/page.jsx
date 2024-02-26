"use client";
import Image from "next/image";
import logoImg from "../../../../public/logo-black-removebg-preview.png";
function handleLogin() {}

export default function LoginPage() {
  return (
    <body className="">
      <div
        className="
        flex flex-col justify-center items-center h-screen bg-gradient-to-b from-black via-blue-200 to-white"
      >
        <div className="flex flex-col justify-center items-center space-y-5">
          <Image src={logoImg} alt="logo" width={100} height={100} />
          <h3 className="text-2x2 font-bold text-white">Return of MGM</h3>
        </div>
        <div>
          <form
            className="flex flex-col justify-center items-center space-y-5"
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
                  fetch("/api/login", {
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
              className="
              p-2 rounded-md"
              type="email"
              name="email"
              placeholder="E-mail"
            />
            <input
              className="
              p-2 rounded-md
            "
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              className="
              p-2 rounded-md bg-blue-400 text-white
            "
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </body>
  );
}

{
  /* <h1>Login</h1>
            <form onSubmit={handleLogin = (e) =>{
            e.preventDefault();
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;
            const formData = {
              email,
              password
            }
          console.log(formData);
          try{
            fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          })}catch(e){
            console.log(e);
          }
        }}>
                <input type="email" name="email" placeholder="E-mail" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form> */
}
