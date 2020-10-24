const express= require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('./connection.js');
const userroute = require('./routes/userroute');
const blogpostroute = require('./routes/blogpostroute');
require('dotenv').config();

const saltRounds = 13;

const port = process.env.PORT
let jwt_key = process.env.JWT_KEY;


app.use(cors());
app.use(express.json({extended:false}))

app.use("/api",userroute);
app.use("/api",blogpostroute);

app.get("/",(req,res)=>{
    console.log(`hit at root`);
    res.send(200).send(`<h1>Root</h1>`);
})



app.listen(port,(err)=>{
    if(err) {
        consoele.log(err)
    }
    else {
        console.log(`listening at port ${port}`);
    }
})

