const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDB = () => {
  const mongouri = `mongodb+srv://${process.env.USERDB}:${process.env.USERPASS}@cluster0.obwta.mongodb.net/LearningDB2023?retryWrites=true&w=majority`;
  
  try {
       mongoose.connect( 
      mongouri,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // version: ServerApiVersion.v1,
      },
      console.log("connected to database")
    );
  } catch (error) {
    console.log(error);
 
  }
};

export default connectDB;