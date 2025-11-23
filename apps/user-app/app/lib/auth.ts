import { prisma } from "@repo/db";
import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credential",
      credentials: {
        name: {
          label: "Enter your name ",
          placeholder: "PRINCE ",
          type: "text",
        },
        phone: {
          label: "Enter your number",
          placeholder: "0987654321",
          type: "text",
        },
        password: {
          label: "Enter your password",
          placeholder: "********",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // TODO: do zod or otp verifation
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { number: credentials.phone },
        });
        if (user) {
          const isVerifed = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isVerifed) {
            return {
              id: String(user.id),
              name: user.name,
              email: user.number,
              image: user.image,
            };
          }
          return null;
        }

        try {
          const password = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: {
              name: credentials.name,
              number: credentials.phone,
              password: password,
            },
            select: {
              id: true,
              name: true,
              image: true,
              number: true,
            },
          });
          return {
            id: String(newUser.id),
            name: newUser.name,
            email: newUser.number,
            image: newUser.image,
          };
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
};
