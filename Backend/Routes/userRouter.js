const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const { sendMail } = require("../nodemailer");
let jwt = require("jsonwebtoken");

const Router = express.Router();

Router.post("/signup",[
    body("email","Enter a valid email").isEmail(),
    body("password","Password must be atleast 8 characters").isLength({min:8})
],
async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({ error: "Details unjustified" });
    }
    try{
        let user = await userModel.findOne({email:req.body.email});
        if (user){
           return res.status(400)
            .json({ success: false, message: "This email is already registered." });
        }
        obj = req.body;
        const hashedPassword = await bcrypt.hash(obj.password,10);
        obj.password = hashedPassword;
        user = new userModel(obj);
        user
        .save()
        .then((user) => res.send({user,success:true}))
        .catch((err) => {
            res.send({success:false,message:err.message});
        });
    }catch(error){
        res.status(400).send({ success: false, message: "Internal Server Error" });
    }
});

Router.post("/sendotp",async (req,res) => {
    try{
        let user = await userModel.findOne({email : req.body.email});
        if (user){
            return res.status(400).json({success:false,message:"This email is already registered."});
        }
        const min = 100000; //min six digit number
        const max = 999999; // max six digit number 
        const OTP = Math.floor(Math.random()* (max - min +1) + min );
        req.body.OTP = OTP;
        sendMail("OTP", req.body); 
        res.json({success:true,OTP});
    }catch{
        res.json({ success: false, message: "Internal server error" });
    }
});



Router.post("/login",
[
    body("email","Enter a valid email").isEmail(),
    body("password","Enter Password").exists(),
]
,async(req,res) => {
    let sucess = false
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ error: "Details unjustified" });
    }
    const {email,password} = req.body
    try{
        let user = await userModel.findOne({email})
        if (!user){
            success = false;
            return res.status(400)
            .json({ success, message: "Doesn't have account" });
        }
        const comparePassword =await bcrypt.compare(password,user.password);
        if (!comparePassword){
            success = false;
        return res.status(400).
          json({ success, message: "Invalid Password." });
        }

        const payload = {
            user:{
                id:user.id
            }
        }
       
        const jwtToken = jwt.sign(payload,"userlogin")
        res.json({success:true,jwtToken})
    }catch(error){
        //console.log(error)
        res.status(500).json({success:false, message:"Internal Server Error"});
    }

})


Router.post("/forgotpassword",async(req,res)=>{
    let email = req.body.email
    try{
        let user = await userModel.findOne({email})
        if(user){
            const resetToken = user.createResetToken()
            let resetPasswordLink = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`
            let obj = {
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetpassword",obj)
            res.json({success:true})
        }else{
            res.status(400).json({success:false,message:"Email not registered"})
        }
    }catch{
        res.json({
            success:false,
            message:"Internal Server Error"
        })

    }
})


Router.post("/resetpassword",async (req,res) => {
    const token = req.body.resetToken
    const newPassword = req.body.password
    try{
        const user = await userModel.findOne({resetToken:token})
        if (user){
            const hashedPassword = await bcrypt.hash(newPassword,10);
            user.resethandlerpassword(hashedPassword)
            await user.save()
            res.json({ success: true, user })
        }else{
            res.json({ success: false, message: 'User not found.' })
        }

    }catch{
        res.json({success:false,message: "Internal server error." })
    }

})





module.exports = Router;
