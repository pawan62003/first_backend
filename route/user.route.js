const express = require('express');
const {userModle} = require('../model/user.modle')
const userRoute = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRoute.post("/register",async(req,res)=>{
    const {name,email,pass,age} = req.body
   try {
    bcrypt.hash(pass,5,async(err, hash) => {
        const user = new userModle({name,email,age,pass:hash})
        await user.save();
        res.send({"msg":"data is register"})
    })
   } catch (error) {
    res.send(error)
   }
})

userRoute.post("/login",async(req,res)=>{
    const {pass,email} = req.body;
    try {
        const user = await userModle.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result) => {
               if(result){
                const token = jwt.sign({autherID:user._id,auther:user.name},'masai',{expiresIn:'3h'})
                res.status(200).send({"token":token})
               }
            })
        }
        else{
            res.status(200).send({"msg":"wrong input"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={
    userRoute
}