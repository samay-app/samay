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
  emailID: string; // encrypted email ID
  choices: Choice[];
  finalChoice?: Choice;
  votes?: Vote[];
}

const PollSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  open: { type: Boolean, default: true },
  emailID: { type: String, required: true }, // encrypted email ID
  choices: { type: [{ start: Number, end: Number }], required: true },
  finalChoice: { type: { start: Number, end: Number } },
  votes: [{ name: String, choices: [{ start: Number, end: Number }] }],
}, { timestamps: true });

const Poll: Model<RocketMeetPoll> = mongoose.model('Poll', PollSchema);

export default Poll;
