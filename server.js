const express = require('express');
const morgan = require('morgan');
const dotenv =require('dotenv').config();
const uRouter = require('./routes/userRouter.js');
const pRouter = require('./routes/profileRouter.js');
const postRouter =require('./routes/postRouter.js');
const bodyParser = require('body-parser');

const app=express();

app.listen(3000,()=>console.log('Server is running at 3000'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(uRouter);
app.use(pRouter);
app.use(postRouter);