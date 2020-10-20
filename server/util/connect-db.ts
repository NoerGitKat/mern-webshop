import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mernshop-db.7mgag.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      options
    );

    console.log(`MongoDB connected! ${db.connection.host}`.cyan);
  } catch (error) {
    console.error(`Error in DB connection: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
