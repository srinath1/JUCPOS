const mongoose=require('mongoose')
const URL="mongodb+srv://jucpos@graphqlnode.z5vfw.mongodb.net/pointofsale?retryWrites=true&w=majority"
mongoose.connect(URL)
let connectionobj=mongoose.connection;
connectionobj.on('connected',()=>{
    
    console.log("Mongodb Connected")
})
connectionobj.on('error',()=>{
    console.log('Error in connecting')

})
