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
  name: string;
  times: Time[];
}

export interface VoteFromDB {
  _id: string;
  name: string;
  times: TimeFromDB[];
}

export interface Poll {
  title: string;
  description?: string;
  open?: boolean;
  secret: string;
  location?: string;
  times: Time[];
  finalTime?: Time;
  votes?: Vote[];
}

export interface PollFromDB {
  _id: string;
  title: string;
  description?: string;
  open?: boolean;
  secret: string;
  location?: string;
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
  secret: string;
  location?: string;
  times: Time[];
  finalTime?: Time;
  votes?: Vote[];
}

const PollSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    open: { type: Boolean, default: true },
    secret: { type: String, required: true },
    location: { type: String },
    times: {
      type: [{ start: Number, end: Number }],
      required: true,
    },
    finalTime: { type: { start: Number, end: Number } },
    votes: [
      {
        name: String,
        times: [{ start: Number, end: Number, ifNeedBe: Boolean }],
      },
    ],
  },
  { timestamps: true }
);

const KukkeePoll: Model<PollDoc> =
  mongoose.models.Poll || model("Poll", PollSchema);

export interface HttpResponse {
  data: any;
  statusCode: number;
}

export default KukkeePoll;
