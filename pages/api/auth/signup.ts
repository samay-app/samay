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

        const existingUserWithSameEmail: UserDoc | null = await KukkeeUser.findOne(
          {
            email: newUserData.email,
          }
        ).lean();
        if (existingUserWithSameEmail) {
          res.status(422).json({
            message:
              "You already have an account assoicated with this email address.",
          });
          return;
        }

        const existingUserWithSameUsername: UserDoc | null = await KukkeeUser.findOne(
          {
            username: newUserData.username,
          }
        ).lean();
        if (existingUserWithSameUsername) {
          res.status(422).json({
            message: "Username taken. Please try another one.",
          });
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
