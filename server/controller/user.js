const UserModel = require('../models/user')
const nodemailer = require('nodemailer')

module.exports.Register = (req, res) => {
    console.log(req.body)

    // email should not exist alreday

    const newUser = new UserModel({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then(() => {
        res.send({ code: 200, message: 'Signup success' })
    }).catch((err) => {
        res.send({ code: 500, message: 'Signup Err' })
    })

}

module.exports.Login = (req, res) => {
    console.log(req.body.email)

    // email and password match

    UserModel.findOne({ email: req.body.email })
        .then(result => {
            console.log(result, '11')

            // match password with req.body.password
            if (result.password !== req.body.password) {
                res.send({ code: 404, message: 'password wrong' })
            } else {
                res.send({
                    email: result.email,
                    code: 200,
                    message: 'user Found',
                    token: 'hfgdhg'
                })
            }

        })
        .catch(err => {
            res.send({ code: 500, message: 'user not found' })
        })


    // newUser.save().then(() => {
    //     res.send({ code: 200, message: 'Signup success' })
    // }).catch((err) => {
    //     res.send({ code: 500, message: 'Signup Err' })
    // })

}

module.exports.sendotp = async (req, res) => {
    console.log(req.body)
    const _otp = Math.floor(100000 + Math.random() * 900000)
    console.log(_otp)
    let user = await UserModel.findOne({ email: req.body.email })
    // send to user mail
    if (!user) {
        res.send({ code: 500, message: 'user not found' })
    }

    // let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "53528ee493063f",
          pass: "e4ee740cc91a03"
        }
      });

    

    let info = await transporter.sendMail({
        from: 'awaisnaeem700@gmail.com',
        to: req.body.email, // list of receivers
        subject: "OTP", // Subject line
        text: String(_otp),
        html: `<html>
            < body >
            Hello and welcome ${_otp}
        </ >
       </html > `,
    })

    if (info.messageId) {

        console.log(info, 84)
        UserModel.updateOne({ email: req.body.email }, { otp: _otp })
            .then(result => {
                res.send({ code: 200, message: 'otp send' })
            })
            .catch(err => {
                res.send({ code: 500, message: 'Server err' })

            })

    } else {
        res.send({ code: 500, message: 'Server err' })    
    }
}


module.exports.submitotp = (req, res) => {
    console.log(req.body)


    UserModel.findOne({ otp: req.body.otp }).then(result => {

        //  update the password 

        UserModel.updateOne({ email: result.email }, { password: req.body.password })
            .then(result => {
                res.send({ code: 200, message: 'Password updated' })
            })
            .catch(err => {
                res.send({ code: 500, message: 'Server err' })

            })


    }).catch(err => {
        res.send({ code: 500, message: 'otp is wrong' })

    })


}