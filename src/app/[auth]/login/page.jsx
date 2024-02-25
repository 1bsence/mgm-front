"use client";

function handleLogin(){};

export default function LoginPage() {
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin = (e) =>{
            e.preventDefault();
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;
            const formData = {
              email,
              password
            }
          console.log(formData);

        }}>
                <input type="email" name="email" placeholder="E-mail" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}