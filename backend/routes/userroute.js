const express = require('express');
const con = require('../connection.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let router = express.Router();

require('dotenv').config();

const saltRounds = 13;

const port = process.env.PORT
let jwt_key = process.env.JWT_KEY;

router.route("/register")
      .post((req,res)=>{
    let name = req.body.name
    let email = req.body.email;
    let password = req.body.pass;
    let sqlregisterquery = `SELECT * FROM users`;
    con.query(sqlregisterquery, async(err,row,fields)=>{
        console.log(row);
        let allres = row;
        let duplicateuser = allres.find((thatuser)=>email ===thatuser.email)

        if(!duplicateuser) {
            let passHash = await bcrypt.hash(password, saltRounds)
            let newUser = {
                _id: Date.now(),
                email: email,
                password: passHash,
                name: name,
              };

            let sqlinsertion = `INSERT INTO users values(${newUser._id},"${name}","${email}","${passHash}","user")`;

            con.query(sqlinsertion,(err)=>{
                if(err) {
                    console.log(err)
                }
               
            })  
            console.log(allres);
            console.log(`insertion successfull ${newUser}`)
            console.log(newUser);
            res.status(201).send({data:newUser})                       
        }
        else {
            res.status(400)
                .send({error:{code:400,message:'Email address already used'}})
        }
        })
      })

router.route("/login")
      .post((req,res)=>{
        let {email,pass}= req.body;
    let usermatchquery = `SELECT * FROM users`;
    con.query(usermatchquery,async(err,row,field)=>{
        if(err) {console.log(err)}
        else {
        let allresults = row;
        console.log("what "+allresults);
        let userMatch = allresults.find((user)=> email === user.email)

        if(userMatch) {
            let savedPass = userMatch.password;
            let savedemail = userMatch.email;

            //whether the logged person is an admin
            console.log(userMatch.role);
            if(userMatch.role === 'admin' || userMatch.role ==='Admin') {
                if(pass === savedPass) {
                console.log(`admin trying to log in`);
                //special admin token
                let specid = Math.random().toString(36).substring(2,8);
                let speclimit = 60*3600; //1 day token lifetime
                let specexpiry = Math.floor(Date.now()/1000)+speclimit;
                let payload = {
                    id:specid,
                    exp: specexpiry,
                }
                let token = jwt.sign(payload, jwt_key);
                let adminsignature = [... Array(10)]
                .map((n)=>(Math.random()*36 | 0).toString(36)).join('')
                console.log(adminsignature);
                res.status(200).send({data:{token:token,email:savedemail,adminkey:adminsignature}})
            }
                else {res.status(401).send({
                    error:{ code:401,message:'invalid username or password.'}
                })}

            }
            else {
                //the logged user is not an admin
            const passwordDidMatch = await bcrypt.compare(pass,savedPass);
            if(passwordDidMatch) {
                let id = Math.random().toString(36).substring(2,8);
                let limit = 60*3600; //1 day token lifetime
                let expiry = Math.floor(Date.now()/1000)+limit;
                let payload = {
                    id:id,
                    exp: expiry,
                }
                let token = jwt.sign(payload, jwt_key);
                res.status(200).send({data:{token:token,email:savedemail}});
            }
            else {
                res.status(401).send({
                    error:{ code:401,message:'invalid username or password.'}
                })
            }
        }
        }
            //if user is not found
            else {
                let fakepass = await `$2b$${saltRounds}$invaliduserlol`;
                 bcrypt.compare(submittedPass,fakepass);
                res.status(401)
                    .send({error:{code:401,message:'invalid username or password'}})
            }
        }
        })
   
    
      })      

router.route("/allusers")
      .get((req,res)=>{
          let fetchquery= `select id,name,email,role from users`
          con.query(fetchquery,(err,row,field)=>{
              if(err) {
                  console.log(err)
              }
              else {
              res.send(row)
              }
          })
      })      

module.exports = router;      