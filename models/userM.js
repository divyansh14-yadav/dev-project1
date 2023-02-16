import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    name:
    {
        type: String,
    },
    age:
    {
        type: Number,
    },
    city:
    {
        type: String,
    },
    gender: {

        type: String,

        enum: ["Male", "Female", "f", "m", "M", "F", "other", "male", "female", "o"]   // enum is used for taking multiple fields like in gender true false admin user etc and also enum restrict the fields of data if we type incoreects the value 
    },

    salary:
    {
        type: Number,
    },
    phone:
    {
        type: Number,
    },
    address:
    {
        type: String
    }
})

const User = new mongoose.model('crud', userSchema);

export default User