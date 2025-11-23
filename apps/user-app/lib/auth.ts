import { prisma } from "@repo/db"
import { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
export  const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credential",
            credentials: {
                name: {label: "Enter your name ", placeholder: "PRINCE ", type: "text"},
                username: {label: "Enter your email", placeholder: "example@gmail.com", type: "text"},
                password: {label: "Enter your password", placeholder: "********", type: "password"}
            },
            async authorize(credentials, req){
                // check existing usr
                const password = await bcrypt.compare(credentials?.password, )
                const exsit = prisma.user.findUnique({
                    where: {email: credentials?.username, }
                })
            }
        })
    ]
} 