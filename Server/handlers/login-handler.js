const url = require('url');
const qs = require('querystring')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const secret = require('../config/secret.js')
const mongoose = require('mongoose')

module.exports=(req,res)=>{
    const pathname = url.parse(req.url).pathname;
    User.find(function(err,users){
        if(err){
            console.log(err);
            return;
        }
        if(users.length==0){
            User.create({
                _id: mongoose.Types.ObjectId(),
                username: "rosen",
                password: "123",
                level: 1,
                xp:100,
                gold:500

            })
        }
    });
    if(pathname === '/login') {
        let username=''
        let password='';
        if (req.method === 'POST') {
            let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        
    });
    req.on('end', () => {
       const formData = qs.parse(body);
       let responseToClient={};
       User.findOne({username: formData.username},function (err,foundUser){
        
        if(foundUser==null){

            responseToClient={
                success:false,
                message:"User not found"
            }
            res.writeHead(400,{
            'Content-Type':'text/plain'
        });
        res.write(JSON.stringify(responseToClient));
        res.end();
        }else {
            if(formData.password===foundUser.password){
               const token = jwt.sign({username:formData.username},secret.key,{
                   expiresIn:'1h'
               });
              
                responseToClient = 
               {
                   success:true,
                   token: token,
                   xp: foundUser.xp,
                   level: foundUser.level,
                   gold: foundUser.gold,
                   userId: foundUser._id

               }

                res.writeHead(200,{
                    'Content-Type':'text/plain'
                });
                res.write(JSON.stringify(responseToClient));
                
               res.end();
            }else{
                responseToClient={
                    success:false,
                    message:"Wrong password"
                }
                res.writeHead(400,{
                'Content-Type':'text/plain'
            });
            res.write(JSON.stringify(responseToClient));
            res.end();
            }
        }
    })
    });
   

         } else return true;
    }  
}