const nodemailer = require("nodemailer")

module.exports.sendMail = async function sendMail(str,data){
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.email,
            pass:process.env.password
        }
    })
    let subject,html;
    if (str == "OTP"){
        subject = `Hello User`
        html = ` <h1>Welcome to TrekGlobal,</h1>
        <br>
        Your OTP to verify email address is given below.
        <br>
        <h1>${data.OTP}</h1>`
    }else{
        subject = `Reset Password`
        html=` <h1>Link to reset your password</h1>
        <br>
        ${data.resetPasswordLink}`
    }


    let info = await transporter.sendMail({
        from: '"TrekGloabl" <jayanth34998@gmail.com>', // sender address
        to: data.email, // list of receiver
        subject: subject, // Subject line
        html: html // html body
    })

}

