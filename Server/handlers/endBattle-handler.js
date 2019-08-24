const url = require('url');
const jwt = require('jsonwebtoken');
const qs = require('querystring');
const config = require('../config/secret.js');
const User = require('../models/userModel')

module.exports= (req,res)=>{
    const pathname = url.parse(req.url).pathname;
    
    let checkToken = {
        success: false,
        message:''
    }
    if(pathname==='/endbattle'){
        
        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        });

        let token = req.headers['x-access-token'] || req.headers['authorization']; 

  if (token) {
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
          checkToken.success=false;
          checkToken.message='Token is not valid';

      } else {
          console.log(decoded)
          checkToken.success=true;
          checkToken.message='Recognized token';
        }
    });
  } else {
      checkToken.success=false;
      checkToken.message='Auth token is not supplied';

  }

        req.on('end',()=>{
            let responseToClient={};
            if(checkToken.success===false) {
                res.writeHead(400,{
                    'Content-Type':'text/plain'
                });
                res.write(JSON.stringify(checkToken));
                res.end(); 
                return false;
            }
            if(checkToken.success===true) {
                
                const playerStats=qs.parse(data);
                const gold =parseInt(playerStats.gold);
                const xp=parseInt(playerStats.xp);
                const won= (playerStats.won==='true');
               

                User.findOne({_id:playerStats.userId},function(err,foundUser){
                   if(err){
                    responseToClient={
                        success:false,
                        message:"Cannot find user"
                    }
                    res.writeHead(400,{
                    'Content-Type':'text/plain'
                });
                res.write(JSON.stringify(responseToClient));
                res.end();
                   }
                    foundUser.xp=xp;
                    foundUser.gold=foundUser.gold+gold;
                    if(won){
                        foundUser.won_pve=foundUser.won_pve+1;
                    }

                    foundUser.save();

                    responseToClient={
                        success:true,
                        message:"OK"
                    }
                    res.writeHead(200,{
                    'Content-Type':'text/plain'
                });
                res.write(JSON.stringify(responseToClient));
                res.end();
                });
                

            }


        });
    }else return true;
}