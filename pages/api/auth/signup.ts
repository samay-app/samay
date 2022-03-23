import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../src/helpers/auth";
import KukkeeUser, { UserDoc } from "../../../src/models/user";
import connectToDatabase from "../../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        await connectToDatabase();

        const newUserData = JSON.parse(body);

        if (!newUserData.email.includes("@")) {
          res.status(422).json({ message: "Invalid email or password." });
          return;
        }

        const existingUser: UserDoc | null = await KukkeeUser.findOne({
          email: newUserData.email,
        }).lean();

        if (existingUser) {
          res.status(422).json({ message: "User is already registered." });
          return;
        }

        newUserData.password = await hashPassword(newUserData.password);

        const newUser: UserDoc = new KukkeeUser(newUserData);
        await newUser.save();

        res.status(201).json(newUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
