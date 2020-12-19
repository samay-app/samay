import mongoose, { Model, Document } from 'mongoose';

export interface MarkedProps {
  userID: string,
  choices: number[]
}

export interface PollProps extends Document {
    pollName: string;
    userID: string;
    interval: string;
    choices: number[],
    marked?: MarkedProps[]
  }

const PollSchema: mongoose.Schema = new mongoose.Schema({
    pollName: { type: String, required: true },
    userID: { type: String, required: true },
    interval: { type: Number, required: true },
    choices: { type: [Number], required: true },
    marked: [{ userID: String, choices: [Number] }],
});

const Poll: Model<PollProps> = mongoose.model('Poll', PollSchema);

export default Poll;
