import pkg from 'mongoose';
const { Schema, model} = pkg;

const UserVerificationScheme = Schema({
    username: String,
    email: String,
    verificationCode: String
});

export default model("userverification", UserVerificationScheme);