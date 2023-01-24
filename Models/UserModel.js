import pkg from 'mongoose';


const { Schema, model} = pkg;


const userSchema = Schema({
    username: String,
    email: String,
    password: String,
    confirmed: Boolean
});


export default model("userinfo", userSchema);