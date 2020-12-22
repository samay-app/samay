import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectionOptions } from 'mongoose';

const mongod = new MongoMemoryServer();

// Connect to the in-memory database

const connect = async (): Promise<void> => {
    const uri: string = await mongod.getUri();

    const mongooseOpts: ConnectionOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: true,
    };

    await mongoose.connect(uri, mongooseOpts);
};

// Remove all the data for all db collections

const clearDatabase = async (): Promise<void> => {
    const collections: string[] = Object.keys(mongoose.connection.collections);

    collections.forEach(async (key) => {
        const collection = mongoose.connection.collections[key];
        await collection.deleteMany({});
    });
};

// Drop database, close the connection and stop mongod

const closeDatabase = async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

export default { connect, clearDatabase, closeDatabase };
