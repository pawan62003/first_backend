const expreess = require('express');
const noteRoute = expreess.Router();
const {noteModel} = require('../model/note.modle')

noteRoute.post("/create",async(req,res)=>{
    try {
        const note = new noteModel(req.body)
        await note.save();
        res.status(200).send({"msg":"note is added in your DB"})
    } catch (error) {
        res.send(error)
    }
})

noteRoute.get("/",async(req,res)=>{
    try {
        const notes = await noteModel.find({autherID:req.body.autherID});
        res.status(200).send(notes)
    } catch (error) {
        res.send(error)
    }
})

noteRoute.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const note = noteModel.find({_id:id})
    try {
        if(req.body.autherID===note.autherID){
            await noteModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"the note is updated"})
        }
        else{
            res.send('you are not authorize person')
        }
    } catch (error) {
        res.send(error)
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const note = noteModel.find({_id:id})
    try {
        if(req.body.autherID===note.autherID){
            await noteModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"data is deleted"})
        }
        else{
            res.send('you are not authorize person')
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={
    noteRoute
}