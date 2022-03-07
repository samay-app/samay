import { connect, ConnectionOptions } from "mongoose";

const { MONGODB_URI = "mongodb://localhost:27017/polls" } = process.env;

const options: ConnectionOptions = {
  useUnifiedTopology: true,
  autoIndex: true,
};

const connectToDatabase = (): Promise<typeof import("mongoose")> =>
  connect(MONGODB_URI, options);

export default connectToDatabase;
