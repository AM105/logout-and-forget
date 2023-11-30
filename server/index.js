const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const userController = require('./controller/user')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose
  .connect("mongodb://0.0.0.0:27017/zubair", {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
  })
  .then(() => {   
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");   
  });       



  app.post('/Register', userController.Register)
  app.post('/Login', userController.Login)
  app.post('/submit-otp', userController.submitotp)
  app.post('/send-otp', userController.sendotp)



   



app.listen(5000, () => {
  console.log(`Backend Running At Port 5000`);
});
