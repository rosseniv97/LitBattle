const mongoose = require('mongoose');

const questionRoundSchema = new mongoose.Schema({
    _id:mongoose.SchemaTypes.ObjectId,
    Question_FK: {type: Schema.Type.ObjectId, ref: 'question'},
    player1_loaded: {type: mongoose.SchemaTypes.Date,default: Date.now},
    player2_loaded: {type: mongoose.SchemaTypes.Date,default: Date.now}
    

})

module.exports=mongoose.model("questionRound", questionRoundSchema);