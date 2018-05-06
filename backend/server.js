 var express = require('express')
 var app = express()
 var mongoose = require('mongoose')
 var bodyParser = require('body-parser')
 var jwt = require('jwt-simple')
 var cors = require('cors')

var User = require('./models/User.js')

 var posts =[
   {message: 'Hello'},
   {message: "Hi"}
 ]

 app.use(cors())
 app.use(bodyParser.json())

 app.get('/posts', (req, res)=>{
   res.send(posts)
 })

 app.get('/users', async (req, res)=>{
try {
  var users = await User.find({}, '-pwd -__v')
  res.send(users)
} catch (e) {
  console.error(error)
  res.sendStatus(500)
}

 })


 app.post('/register', (req, res)=>{
   var userData = req.body;
   var user = new User(userData)
    user.save((err,result)=>{
      if(err)
        console.log('Error al agregar usuario')

      res.sendStatus(200)
    })

})

app.post('/login', async (req, res)=>{
  var userData = req.body;

  var user = await User.findOne({email:userData.email})
  if(!user)
    return res.status(401).status({message: 'Email o contraseña invalidos'})

    if(userData.pwd != user.pwd)
      return res.status(401).status({message: 'Email o contraseña invalidos'})

    var payload={}

    var token = jwt.encode(payload, '123')


  res.status(200).send({token})

})

mongoose.connect('mongodb://test:test@ds055575.mlab.com:55575/pscolegio',(err)=>{
  if(!err)
    console.log('connected to mongo')
})

 app.listen(3000)
