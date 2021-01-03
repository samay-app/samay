import mongoose, { Model, Document } from 'mongoose';

export interface Vote {
  userID: string;
  choices: Choice[];
}

export interface Choice {
  start: number;
  end: number;
}

export interface RocketMeetPoll extends Document {
  title: string;
  description?: string;
  open?: boolean;
  userID: string;
  choices: Choice[];
  finalChoice?: Choice;
  votes?: Vote[];
}

const PollSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  open: { type: Boolean, default: true },
  userID: { type: String, required: true },
  choices: { type: [{ start: Number, end: Number }], required: true },
  finalChoice: { type: { start: Number, end: Number } },
  votes: [{ userID: String, choices: [{ start: Number, end: Number }] }],
}, { timestamps: true });

const Poll: Model<RocketMeetPoll> = mongoose.model('Poll', PollSchema);

export default Poll;
