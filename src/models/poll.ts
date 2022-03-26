import mongoose, { model, Model, Document, Schema } from "mongoose";

export interface Time {
  start: number;
  end: number;
  ifNeedBe?: boolean;
}

export interface TimeFromDB {
  _id: string;
  start: number;
  end: number;
  ifNeedBe?: boolean;
}

export interface Vote {
  username: string;
  times: Time[];
}

export interface VoteFromDB {
  _id: string;
  username: string;
  times: TimeFromDB[];
}

export type PollType = "public" | "protected";

export interface Poll {
  title: string;
  description?: string;
  open?: boolean;
  username: string;
  location?: string;
  type: PollType;
  times: Time[];
  finalTime?: Time;
  votes?: Vote[];
}

export interface PollFromDB {
  _id: string;
  title: string;
  description?: string;
  open?: boolean;
  username: string;
  location?: string;
  type: PollType;
  times: TimeFromDB[];
  finalTime?: TimeFromDB;
  votes?: VoteFromDB[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PollDoc extends Document {
  title: string;
  description?: string;
  open?: boolean;
  username: string;
  location?: string;
  type: PollType;
  times: Time[];
  finalTime?: Time;
  votes?: Vote[];
}

const PollSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    open: { type: Boolean, default: true },
    username: { type: String, required: true },
    location: { type: String },
    type: { type: String, required: true },
    times: {
      type: [{ start: Number, end: Number }],
      required: true,
    },
    finalTime: { type: { start: Number, end: Number } },
    votes: [
      {
        username: String,
        times: [{ start: Number, end: Number, ifNeedBe: Boolean }],
      },
    ],
  },
  { timestamps: true }
);

const KukkeePoll: Model<PollDoc> =
  mongoose.models.Poll || model("Poll", PollSchema);

export interface HttpResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  statusCode: number;
}

export default KukkeePoll;
