const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id:mongoose.SchemaTypes.ObjectId,
    username:{type:mongoose.SchemaTypes.String,required:true,},
    password:{type:mongoose.SchemaTypes.String,required:true},
    levels:[mongoose.SchemaTypes.Number],                 //{type:mongoose.SchemaTypes.Number,default:0},
    won_pve:{type:mongoose.SchemaTypes.Number,default:0},
    won_pvp:{type:mongoose.SchemaTypes.Number,default:0},
    gold:{type:mongoose.SchemaTypes.Number,default:0},
    xp:{type:mongoose.SchemaTypes.Number,default:0}
})

module.exports=mongoose.model("users", userSchema);
