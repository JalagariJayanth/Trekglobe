const mongoose = require("mongoose")
const crypto = require("crypto")

const { Schema } = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken : String
})

userSchema.post("save",function(){
    console.log("user saved")
})

userSchema.methods.createResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.resetToken = resetToken
    this.save()
    return resetToken
}

userSchema.methods.resethandlerpassword = function(newPassword){
    this.password = newPassword
    this.resetToken = undefined
    
}

const userModel = mongoose.model("users",userSchema)
module.exports = userModel