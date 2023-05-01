const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    pass:{type:String,require:true},
    age:{type:String,require:true}
},{
    versionKey:false
})

const userModle = mongoose.model('user',userSchema);

module.exports={
    userModle
}