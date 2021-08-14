const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

dotenv.config({path : './config.env'})
const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then(() => {
    console.log("connection Successful")
}).catch((err) =>{
    console.log("No connection")
})

const middleware = (req , res , next) =>{
    console.log("Hello Middleware")
    next()
}




app.get('/' , (req , res) =>{
    res.send("Hello Wolrd from Express")
})

app.get('/about' , middleware ,(req , res) =>{
    console.log("about")
    res.send("Hello Wolrd from about Express")
})

app.get('/contact' , (req , res) =>{
    res.send("Hello Wolrd from contact Express")
})
app.get('/signin' , (req , res) =>{
    res.send("Hello Wolrd from login Express")
})
app.get('/signup' , (req , res) =>{
    res.send("Hello Wolrd from registration Express")
})

console.log("Welcome")

app.listen(3000 , () =>{
    console.log('Server is running on 3000')
})