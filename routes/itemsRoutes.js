const express=require('express')
const itemModel=require('../models/itemsModel')
const router=express.Router()
router.get('/get-all-items',async(req,res)=>{
   try{
       const items=await itemModel.find()
       res.send(items)

   }catch(err){
       res.status(400).json(err)

   }
})
router.post('/add-item',async(req,res)=>{
    try{
        const newItem=new itemModel(req.body)
        await newItem.save()
        res.send('Item added successfully')
 
    }catch(err){
        res.status(400).json(err)
 
    }
 })
 router.post('/edit-item',async(req,res)=>{
    try{
       await itemModel.findOneAndUpdate({_id:req.body.itemId},req.body)
       console.log('Req.Body=>',req.body)
        res.send('Item edited successfully')
 
    }catch(err){
        res.status(400).json(err)
 
    }
 })
 router.post('/delete-item',async(req,res)=>{
    try{
       await itemModel.findOneAndDelete({_id:req.body.itemId})
       console.log('Req.Body=>',req.body)
        res.send('Item deleted successfully')
 
    }catch(err){
        res.status(400).json(err)
 
    }
 })
module.exports=router