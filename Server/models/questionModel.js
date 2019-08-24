const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id:{type:mongoose.SchemaTypes.Number,required:true},
    text:{type:mongoose.SchemaTypes.String,required:true},
    answers:[{type:mongoose.SchemaTypes.String, required:true}],
    correct:{type:mongoose.SchemaTypes.Number,required:true} 

})

module.exports=mongoose.model("questions", questionSchema);