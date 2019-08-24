const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    _id:mongoose.SchemaTypes.ObjectId,
    player1:{type:Schema.Type.ObjectId, ref:'users'},
    player2:{type:Schema.Type.ObjectId, ref:'users'},
    question_round:{type:mongoose.SchemaTypes.Number},
    player1_base_hp:{type:mongoose.SchemaTypes.Number},
    player2_base_hp:{type:mongoose.SchemaTypes.Number},
    player1_loaded:{type: mongoose.SchemaTypes.Boolean},
    player2_loaded:{type: mongoose.SchemaTypes.Boolean},
    player1_ready:{type: mongoose.SchemaTypes.Boolean},
    player2_ready:{type: mongoose.SchemaTypes.Boolean},

})

module.exports=mongoose.model("session", sessionSchema);