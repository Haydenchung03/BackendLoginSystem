import pkg from 'mongoose';


const { Schema, model} = pkg;

const resetShema = Schema({
    username: String,
    email: String,
    verificationCode: String
});

export default model("resetVerification", resetShema);