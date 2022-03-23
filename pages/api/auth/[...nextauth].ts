import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../../../src/utils/db";
import KukkeeUser, { UserDoc } from "../../../src/models/user";
import { verifyPassword } from "../../../src/helpers/auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Name", type: "text", placeholder: "jsmith" },
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@hello.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          if (!credentials) throw new Error("No user found");

          const user: UserDoc | null = await KukkeeUser.findOne({
            email: credentials.email,
          }).lean();

          if (!user) throw new Error("No user found");

          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Password is not valid");

          return {
            email: user.email,
          };
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
});
