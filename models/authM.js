import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    username: {
        type: String,
    },
    email:
    {
        type: String
    },
    password:
    {
        type: String,
    },
    image:
    {
        type: String
    },
    identity:
    {
        type: String,
    },
    token: {
        type: String
    }
})

const User = new mongoose.model('registerjwt', userSchema);

export default User













