const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


require('../db/conn')
const User = require('../model/userSchema')


router.get('/' , (req , res) =>{
    res.send("Hello Wolrd from Express Router")
})

// Using Promises

// router.post('/register' , (req , res) =>{

//     const {name , email , phone , work , password , cpassword} = req.body

//     if (!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error : 'Plz fill require filled'})
//     }

//     User.findOne({email : email})
//     .then((userExist) => {
//         if (userExist){
//             return res.status(422).json({error : 'Email already Exist.'})
//         }

//         const user = new User({name , email , phone , work , password , cpassword})

//         user.save()
//         .then(() =>{
//             res.status(201).json({message: "user registerd successfully"})
//         })
//         .catch((err) => res.status(500).json({error : "Failed to register"}))
//     }).catch(err => {
//         console.log(error)
//     })
   
// })

// Using async

router.post('/register' , async (req , res) =>{

    const {name , email , phone , work , password , cpassword} = req.body

    if (!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error : 'Plz fill require filled'})
    }

    try {
        const userExist = await User.findOne({email : email})

        if(userExist){
            return res.status(422).json({error : 'Email already Exist.'})
        }
        else if(password != cpassword){
            return res.status(422).json({error : 'Password is not matching!'})
        }
        else{
            const user = new User({name , email , phone , work , password , cpassword})

            const userRegister = await user.save()

            if(userRegister) {
                res.status(201).json({message: "user registerd successfully"})
            }
            else{
                res.status(500).json({error : "Failed to register"})
            }
        }

        
    }

    catch(err){
        console.log(err)
    }   
})

router.post('/signin' , async(req , res) =>{
    const {email , password} = req.body

    let token

    if (!email || !password){
        return res.status(422).json({error : 'Plz fill require filled'})
    }

    try{
        const userLogin = await User.findOne({email : email})

        if(userLogin){
            const isMatch = await bcrypt.compare(password , userLogin.password)

            token = await userLogin.generateAuthToken()

            console.log(token)

            res.cookie("jwttoken" , token ,{
                expires : new Date(Date.now() + 25892000000),
                httpOnly : true
            })

            if(isMatch){
                return res.status(201).json({message : 'Login Succesful'})
            }
            else{
                res.status(500).json({error : "Invalid Credetial"})
            }
        }
        else{
            res.status(500).json({error : "Invalid Credetial"})
        }

        
    }

    catch(err) {
        console.log(err)
    }
})




module.exports = router