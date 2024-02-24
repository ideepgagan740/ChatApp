const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv=require('dotenv')
// const RequestHandler  = require('./controller/requestHandler');
const requestHandler = require('./controller/requestHandler');
// respond with "hello world" when a GET request is made to the homepage

dotenv.config();

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

require("./controller/conn");


app.get('/', (req, res) => {
  res.send('hello world')
})
app.get('/chatapp/getallusers', async(req, res) => {
  try {
    let data=await requestHandler.getAllUsers()

    if(data){
      let response={
        code:200,
        message:"Login Successful",
        data:data
      }
      res.send(response)
    }
    
  } catch (error) {
    let response={
      code:404,
      message:error.message
    }
    return response;
  }
})
app.post('/chatapp/signUp', async(req, res) => {
  try {
    let data=await requestHandler.signUp(req.body.data)
    if(data){
      let response={
        code:200,
        message:"SignUp Successful",
        data:data
      }
      res.send(response)
    }
    
  } catch (error) {
    let response={
      code:404,
      message:error.message
    }
    return response;
  }
})
app.post('/chatapp/signIn', async(req, res) => {
  try {
    let data=await requestHandler.signIn(req.body.data)
    if(data){
      let response={
        code:200,
        message:"Login Successful",
        data:data
      }
      res.send(response)
    }
    
  } catch (error) {
    let response={
      code:404,
      message:error.message
    }
    return response;
  }
})
app.post('/chatapp/accessChat', async(req, res) => {
  try {
    console.log("Gagaggagaggagga")
    let data=await requestHandler.accessChat(req.body.data)
    return data
  } catch (error) {
    let response={
      code:404,
      message:error.message
    }
    return response;
  }
})
app.post('/chatapp/fetchChats', async(req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})
app.post('/chatapp/message', async(req, res) => {
  try {
    console.log("Gagaggagaggagga")
    let data=await requestHandler.messages(req.body.data)
    return data
  } catch (error) {
    let response={
      code:404,
      message:error.message
    }
    return response;
  }
})

const PORT=process.env.PORT || 3000
const server=app.listen(PORT,()=>{
  console.log(`Server running at port ${PORT}`)
})

const io=require('socket.io')(server,{
  pingTimeout:60000,
  cores:{
    origin:"http://localhost:3000"
  }
})
io.on("connection",(socket)=>{
console.log("connected to Socket.io")
})