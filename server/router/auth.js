const express = require('express')
const router = express.Router()


require('../db/conn')
const User = require('../model/userSchema')


router.get('/' , (req , res) =>{
    res.send("Hello Wolrd from Express Router")
})

router.post('/register' , (req , res) =>{

    const {name , email , phone , work , password , cpassword} = req.body

    if (!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error : 'Plz fill require filled'})
    }

    User.findOne({email : email})
    .then((userExist) => {
        if (userExist){
            return res.status(422).json({error : 'Email already Exist.'})
        }

        const user = new User({name , email , phone , work , password , cpassword})

        user.save()
        .then(() =>{
            res.status(201).json({message: "user registerd successfully"})
        })
        .catch((err) => res.status(500).json({error : "Failed to register"}))
    }).catch(err => {
        console.log(error)
    })
   
})

module.exports = router