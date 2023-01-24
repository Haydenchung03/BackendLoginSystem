import express from 'express';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import logger from 'morgan';
import pkg from 'mongoose';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { uuid } from 'uuidv4';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fs from 'fs';
import type from 'os';
import User from './Models/UserModel.js';
import UserVerification from './Models/UserVerification.js';
import ResetPassword from './Models/ResetPassword.js';

const app = express();
const { connect, Types } = pkg;
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
mongoose.set('strictQuery', true);
const PORT = process.env.PORT || 3000;
import { spawn } from 'child_process';
const ROOT_DIR_JS = '/public/js';
let host = ["localhost", "YOUR_OPENSTACK_IP"];
app.use(logger('dev'));
app.use(express.static("." + ROOT_DIR_JS));
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');

// You make rename this to something else.
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/my_database',
    collection: 'sessions'
});

//Setting up the express sessions to be stored in the database.
app.use(session(
    { 
    secret: 'top secret key',
    resave: true,
    saveUninitialized: false,
    store: store 
    })
);

// nodemailer stuff (see https://nodemailer.com/about/) Create a .env file in the root directory and add the two varaibles below.
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

// home page
app.get(['/', '/home'], (req, res) => {
    res.render('pages/home', {session: req.session})
});