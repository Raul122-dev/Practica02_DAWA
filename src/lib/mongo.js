const mongoose = require('mongoose');
const { mongoURI } = require('../config')

//const MONGO_URI = config.mongo.uri

//const MONGO_URI = 'mongodb+srv://admin:K3AcadYaEHSNEePJ@cluster0.eitmd.mongodb.net?retryWrites=true&w=majority'

const checkConnection = () => {
    return mongoose.connection.readyState;
  };
  
const connect = async () => {
try {
    if (!checkConnection()) {
    console.log('Connecting...');
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    }
    console.log('Connected successfully');
} catch (error) {
    console.error(error);
}
};
  
const disconnect = async () => {
await mongoose.connection.close();
return checkConnection();
};
  
module.exports = { connect, checkConnection, disconnect };