const dotenv = require('dotenv')
// const mongoose = require('mongoose')
const express = require('express')
const app = express()

dotenv.config({path : './config.env'})

require('./db/conn')

app.use(express.json())

const User = require('./model/userSchema')

app.use(require('./router/auth'))

const PORT = process.env.PORT 



const middleware = (req , res , next) =>{
    console.log("Hello Middleware")
    next()
}

// app.get('/' , (req , res) =>{
//     res.send("Hello Wolrd from Express")
// })

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

app.listen(PORT , () =>{
    console.log(`Server is running on ${PORT}`)
})