const url = require('url');
const {Types} = require('mongoose')
const qs = require('querystring')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const config = require('../config/secret.js');


module.exports=(req,res)=>{
    
    const pathname = url.parse(req.url).pathname;
    
    let checkToken = {
        success: false,
        message:''
    }
    if(pathname==='/register'){

        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        });
//// TOKEN VERIFICATION /////

        let token = req.headers['x-access-token'] || req.headers['authorization']; 

  if (token) {
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
          checkToken.success=false;
          checkToken.message='Token is not valid';

      } else {
          console.log(decoded)
          checkToken.success=true;
          checkToken.message='User already exists';
        }
    });
  } else {
      checkToken.success=false;
      checkToken.message='Auth token is not supplied';

  }



        req.on('end',()=>{

            let responseToClient={};
            if(checkToken.success===true) {
                res.writeHead(400,{
                    'Content-Type':'text/plain'
                });
                res.write(JSON.stringify(checkToken));
                res.end(); 
                return false;
            }
//// TOKEN VERIFICATION /////

            const formData=qs.parse(data);
            User.findOne({'username':formData.username},function(err,user){
                
                if(user.username==formData.username){
                    responseToClient={
                        success:false,
                        message:"User already in database"
                    }
                        res.writeHead(400,{
                        'Content-Type':'text/plain'
                    });
                    res.write(JSON.parse(responseToClient));
                    res.end();
                }else {
                    User.create({
                        _id: Types.ObjectId(),
                        username: formData.username,
                        password: formData.password,
                    }).then((user)=>{
                        responseToClient={
                            success:true,
                            message:"User added to the db"
                        }
                        res.writeHead(200,{
                            'Content-Type':'text/plain'
                        });
                        res.write(JSON.parse(responseToClient));
                        res.end();
                    },(err)=>{
                        responseToClient={
                            success:false,
                            message:"Failed to add user to the db"
                        }
                            res.writeHead(400,{
                            'Content-Type':'text/plain'
                        });
                        res.writeHead(400,{
                            'Content-Type':'text/plain'
                        });
                        res.write(JSON.parse(responseToClient));
                        res.end();
                        throw err;
                    })
                }
            
            });
            
            
        })
  
    }else return true;
}