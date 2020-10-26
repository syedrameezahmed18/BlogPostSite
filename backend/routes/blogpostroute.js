
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const con = require('../connection.js');
let router = express.Router();
const app = express();

require('dotenv').config();

const saltRounds = 13;

const port = process.env.PORT
let jwt_key = process.env.JWT_KEY;


router.route("/posts")
      .get((req,res)=>{
        let junctionquery = `select postid,email,title,bodydata,time from users join posts where users.email = posts.uemail`;
        con.query(junctionquery,(err,row,field)=>{
            if(err) {
                console.log(err)
            }
            else {
                res.send(row);
            }
        }
     )
    })
      .post((req,res)=>{
        let uemail = req.body.uemail;
        let title = req.body.title;
        let bodydata = req.body.bodydata;

        let insertquery = `INSERT INTO posts (uemail,title,bodydata) VALUES('${uemail}','${title}','${bodydata}')`;
        con.query(insertquery,(err,row,field)=>{
            if(err) {
                console.log(err)
                res.send({error:{code:401,message:"some error occured"}})
            }
            else {
                res.send({data:{code:200,message:"insertion successfull"}})
            }
        })
      })

router.route("/comments/:id")
      .get((req,res)=>{
        let thatpost = req.params.id;
        let searchquery = `SELECT comment,commenttime from comments where postid = ${thatpost}`;
        con.query(searchquery,(err,row,field)=>{
            if(err) {
                console.log(err)
                res.send({error:{code:401,message:"unable to fetch"}})
            }
            else {
                res.send(row);
            }
        })
      })
      .post((req,res)=>{
          let thatfreakinpost = req.params.id;
          let commentbody = req.body.comment;
          let commentquery = `INSERT INTO comments (postid,comment) VALUES(${thatfreakinpost},'${commentbody}')`;
          con.query(commentquery,(err,row,field)=>{
              if(err) {
                  console.log(err)
                  res.send({error:{code:401,message:"unable to update"}})
              }
              else {
                let fireback = `SELECT comment,commenttime from comments where postid =${thatfreakinpost}`;
                con.query(fireback,(err,row,field)=>{
                    
                    res.send({data:{truedata:row,code:200,message:"insertion successfull"}})
                })  
                
              }
          })
      })


module.exports = router;