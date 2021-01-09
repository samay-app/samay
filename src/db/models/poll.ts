import mongoose, { Model, Document } from 'mongoose';

export interface Vote {
  name: string;
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
  encryptedEmailIV: string; // IV of the encrypted email
  encryptedEmailText: string; // the encrypted email
  choices: Choice[];
  finalChoice?: Choice;
  votes?: Vote[];
}

const PollSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  open: { type: Boolean, default: true },
  encryptedEmailIV: { type: String, required: true }, // IV of the encrypted email
  encryptedEmailText: { type: String, required: true }, // the encrypted email
  choices: { type: [{ start: Number, end: Number }], required: true },
  finalChoice: { type: { start: Number, end: Number } },
  votes: [{ name: String, choices: [{ start: Number, end: Number }] }],
}, { timestamps: true });

const Poll: Model<RocketMeetPoll> = mongoose.model('Poll', PollSchema);

export default Poll;
