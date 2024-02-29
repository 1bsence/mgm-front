import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Email", type: "text", placeholder: "Email" },
              password: { label: "Password", type: "password" }
            },
            async authorize (credentials, req) {
                const {email, password} = credentials;
                const res = fetch("http://localhost:3030/api/login", {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email, password}),
                })
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else return null;
            }
        }),
    ],
    sesion:{
        strategy: "jwt",
    },
    pages: {
        signIn: "/login"
    },

}

export default NextAuth(authOptions)