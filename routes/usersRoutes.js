const express=require('express')
const UserModel=require('../models/userModel')
const router=express.Router()

router.post('/login',async(req,res)=>{
    try{
       const user= await UserModel.findOne({userId:req.body.userId,password:req.body.password,verified:true})
       
       
       if(user){
        res.send(user)   
        }else{
            res.status(400).json(err)


        }
 
    }catch(err){
        res.status(400).json(err)
 
    }
 })
 router.post('/register',async(req,res)=>{
    try{
        const newuser=new UserModel({...req.body,verified:false})
        await newuser.save()
        res.send('User added successfully')
 
    }catch(err){
        res.status(400).json(err)
 
    }
 })
 
module.exports=router