const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

// Use the MONGO_URI from the .env file
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app on connection error
  }
};

module.exports = connectDB;
