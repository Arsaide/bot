const mongoose = require('mongoose');

const url = process.env.MONGODB_APi_KEY;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected successfuly to MongoDB server')
    } catch (e) {
        console.error('Failed to connect to MongoDB', e);

    }
}

const getGroupCollection = async groupId => {
    let modelName = `GroupID=${groupId}`;

    if(mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }

    const groupSchema = new mongoose.Schema({
        id: {type: Number, required: true, unique: true},
        first_name: String,
        last_name: String,
        username: String,
        lastRequest: {type: Date, default: null},
    })

    mongoose.model(modelName, groupSchema);

    return mongoose.model(modelName)
}

const userSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    first_name: String,
    last_name: String,
    username: String,
})

const User = mongoose.model('User', userSchema);


module.exports = { connectDB, getGroupCollection, User }
