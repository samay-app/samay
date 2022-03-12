import { connect, ConnectionOptions } from "mongoose";

const NEXT_PUBLIC_MONGODB_URI =
  process.env.NEXT_PUBLIC_MONGODB_URI || "mongodb://localhost:27017/polls";

const options: ConnectionOptions = {
  useUnifiedTopology: true,
  autoIndex: true,
};

const connectToDatabase = (): Promise<typeof import("mongoose")> =>
  connect(NEXT_PUBLIC_MONGODB_URI, options);

export default connectToDatabase;
