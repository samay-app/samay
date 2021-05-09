import mongoose, { Model, Document } from 'mongoose';

export interface Choice {
  start: number;
  end: number;
}

export interface Vote {
  name: string;
  choices: Choice[];
}

export type PollType = 'public' | 'protected' | 'private';

export interface RocketMeetPoll extends Document {
  title: string;
  description?: string;
  type?: PollType;
  open?: boolean;
  encryptedEmailID: string;
  choices: Choice[];
  finalChoice?: Choice;
  votes?: Vote[];
}

const PollSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, default: 'public' },
  open: { type: Boolean, default: true },
  encryptedEmailID: { type: String, required: true },
  choices: { type: [{ start: Number, end: Number }], required: true },
  finalChoice: { type: { start: Number, end: Number } },
  votes: [{ name: String, choices: [{ start: Number, end: Number }] }],
}, { timestamps: true });

const Poll: Model<RocketMeetPoll> = mongoose.model<RocketMeetPoll>('Poll', PollSchema);

export default Poll;
