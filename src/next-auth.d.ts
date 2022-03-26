import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    user: {
      username: string;
    };
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    };
    username?: string;
  }
}
