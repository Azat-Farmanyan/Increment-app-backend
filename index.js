const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
var cors = require('cors')
app.use(express.json());
app.use(cors())
const user ={
    email:"azat@mail.ru",
    password:"1234"
}
app.post('/login',async (req, res) => {
  const {email,password} =req.body;
  console.log(email,password,user[email], email)
  if(!email.length || user.email != email  ){
        return res.status(400).json({message:"email is incorrect"})
  }
  if(!password?.length || user.password !== password  ){
        return res.status(400).json({message:"password is incorrect"})
  }

  const token= await jwt.sign({email},"very secret jwt code")
  return res.status(200).json({token})
})
app.post('/incremend',async (req, res) => {
    const Auth=req.headers.authorization?.split("Bearer")[1]
    const {counter}=req.body
   if(Auth){
        const result= counter === 0 ? 1 : counter *2;
        return res.status(200).json(result)
   }
   return res.status(401).json({message:"you are not authorized"})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})