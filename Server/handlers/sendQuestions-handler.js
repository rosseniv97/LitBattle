const url = require('url');
const qs = require('querystring');
const Question = require('../models/questionModel')

module.exports=(req,res)=>{

    const pathname = url.parse(req.url).pathname;
    
    if(pathname==='/sendquestions'){

        let data='';
        req.on('data',chunk=>{
            data+=chunk;
        });
        req.on('end',()=>{
            const question = qs.parse(data);
            let responseToClient={};
            let correctAnswer=''
            const answers = [ question.options[0].question_option,
                             question.options[1].question_option,
                             question.options[2].question_option,    
                             question.options[3].question_option, 
                            ];
            for(i=0;i<4;i++){
                
                if(question.options[i].is_correct=='1')
                correctAnswer=question.options[i].question_option
            }
    
            Question.create({
                id: question.id,
                text: question.question,
                answers: answers,
                correct: correctAnswer 
            }).then(()=>{
                responseToClient={
                    success:true,
                    message:"OK"
                }
                    res.writeHead(400,{
                    'Content-Type':'text/plain'
                });
                res.write(JSON.parse(responseToClient));
                res.end();
            },(err)=>{
                responseToClient={
                    success:false,
                    message:"db fault"
                }
                    res.writeHead(400,{
                    'Content-Type':'text/plain'
                });
                res.write(JSON.parse(responseToClient));
                res.end();
            })
        })
    
    } else {
        return true
    }

}