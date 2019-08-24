const mongoose = require('mongoose');

const searchPoolSchema = new mongoose.Schema({
    _id:mongoose.SchemaTypes.ObjectId,
    User_FK:{type:Schema.Type.ObjectId, ref:'users'} 
    // text:{type:mongoose.SchemaTypes.String,required:true},
    // answers:{type:mongoose.SchemaTypes.Array, required:true},
    // correct:{type:mongoose.SchemaTypes.Number,required:true} 

})

module.exports=mongoose.model("searchPool", searchPoolSchema);