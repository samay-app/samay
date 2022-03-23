import mongoose, { model, Model, Document, Schema } from "mongoose";

export interface User {
  email: string;
  username: string;
  password: string;
}

export interface UserFromDB {
  _id: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserDoc extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const KukkeeUser: Model<UserDoc> =
  mongoose.models.User || model("User", UserSchema);

export interface HttpResponse {
  data: any;
  statusCode: number;
}

export default KukkeeUser;
