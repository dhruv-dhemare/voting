const express = require('express');
const app = express();
const bd =require('./db');
app.use(express.json());

// require('dotenv').config();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// const Port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');


app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(3000,()=>{
    console.log("listening on port : 3000");
})