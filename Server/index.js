const http = require('http');
const url=require('url');
const handlers = require('./handlers/index');
const database = require('./config/dataBase');
const port=8000;

database.then(()=>{
    
    http.createServer((req,res)=>{


        const pathname = url.parse(req.url).pathname;

        for(const handler of handlers){
            if(handler(req,res)===false){
                break;
            }
        }
        


    }).listen(port,()=>{
        console.log('Server running...');
    });
    
}).catch(error=>{
    throw error;
})
