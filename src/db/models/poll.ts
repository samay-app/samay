import mongoose, { Model, Document } from 'mongoose';

export interface MarkedProps {
  userID: string,
  choices: number[]
}

export interface PollProps extends Document {
  name: string;
  description?: string,
  open?: boolean,
  userID: string;
  interval: number;
  choices: number[],
  finalChoice?: number,
  marked?: MarkedProps[]
}

const PollSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  open: { type: Boolean, default: true },
  userID: { type: String, required: true },
  interval: { type: Number, required: true },
  choices: { type: [Number], required: true },
  finalChoice: { type: Number },
  marked: [{ userID: String, choices: [Number] }],
}, { timestamps: true });

const Poll: Model<PollProps> = mongoose.model('Poll', PollSchema);

export default Poll;
