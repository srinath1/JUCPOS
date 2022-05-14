// require=require('esm')(module)
// module.exports=require('./index')
const express = require('express')
const dbConnect=require('./dbConnect')
const path=require('path')

const app = express()
app.use(express.json())
const itemsRoute=require('./routes/itemsRoutes')
const usersRoute=require('./routes/usersRoutes')
const billsRoute=require('./routes/billsRoutes')

app.use('/api/items/',itemsRoute)
app.use('/api/users/',usersRoute)
app.use('/api/bills/',billsRoute)
if(process.env.NODE_ENV==='production')
{
    app.use('/' , express.static('client/build'))
    app.get('*' , (req,res)=>{
         res.sendFile(path.resolve(__dirname , 'client/build/index.html'))
    }) 
}

const port = process.env.PORT || 5000;
const port =  process.env.PORT|| 5000



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))