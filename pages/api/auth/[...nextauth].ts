import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "../../../src/utils/db";
import KukkeeUser, { UserDoc } from "../../../src/models/user";
import { verifyPassword } from "../../../src/helpers/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: {
          label: "Email address",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          if (!credentials) throw new Error("No user found");

          const user: UserDoc | null = await KukkeeUser.findOne({
            username: credentials.username,
          }).lean();

          if (!user) throw new Error("No user found");

          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Password is not valid");

          return {
            username: user.username,
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
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }): Promise<JWT> => {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.username = user.username;
      }
      return token;
    },
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> => {
      // eslint-disable-next-line no-param-reassign
      session.username = token.username as string;
      return session;
    },
  },
});
