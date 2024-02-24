const Chat = require('../model/chatData')
const Message = require('../model/messageData')
const User=require('../model/user')
module.exports = {
     signUp:async (data)=>{
        let current_user = await new User({
            first_name:data.firstName,
            last_name:data.lastName,
            user_pass:data.password,
            user_email:data.email,
        })
        return await current_user.save()
    },
    signIn:async (data)=>{
        let result=await User.find({
            user_email:data.email,
            user_pass:data.password,
        })
        console.log(result, data.email,data.password)
        return result
    },
    messages:async (data)=>{
        var newmessage={
            sender:data.chatId,
            content:data.content,
            chat:data.chatId
        }
        console.log("Inside Messages", newmessage,data)
        try {
            console.log("advchjasd0000")
            var message= await Message.create(newmessage)
            console.log("advchjasd0000")
            message=await message.populate("sender","first_name pic")
            console.log("advchjasd0000")
            message=await message.populate("chat")
            console.log("advchjasd0000")
            message=await User.populate("message",{
                path:"chat.users",
                select:"first_name pic user_email"
            })
            console.log("advchjasd1111")
            await Chat.findbyIdAndUpdate(req.body.chatId,{
                latestMessage:message,
            })
            console.log("advchjasd2222")

            // res.json(message)
            let response={
                code:200,
                message:message,
                data:data
              }
              res.send(response)
        } catch (error) {
            let response={
                code:404,
                message:error.message
              }
              return response;
        }
        let result=await User.find({
            user_email:data.email,
            user_pass:data.password,
        })
        console.log(result, data.email,data.password)
        return result
    },
    accessChat:async(data)=>{
        const {userId}=req.body
        if(!userId){
            let response={
                code:404
              }
              return response;
        }
        var isChat=await Chat.find({
            $and:[{
                users:{
                    $elemMatch:{$eq:req.user._id}
                }
            },
            {
                users:{
                    $elemMatch:{$eq:userId}
                }
            }]
        }).populate("users","user_pass").populate("latestMessage")

        isChat=await User.populate(isChat,{
            path:"latestMessage.sender",
            select: "first_name pic user_email"
        })
        if(isChat.length>0){
            let response={
                code:200,
                data:isChat[0]
              }
              res.send(response)
        }
        else{
            var chatData={
                chatName:"Sender",
                users:[req.user._id,userId]    
            }
            try {
                const createdChat=await Chat.create(
                    chatData
                )
                const FullChat=await Chat.findOne({_id:createdChat._id}).populate(
                    "users",
                    "-password"
                )
                let response={
                    code:200,
                    data:FullChat
                  }
                  res.send(response)
            } catch (error) {
                let response={
                    code:400,
                    data:error.message
                  }
                  res.send(response)
            }
        }
    },
    getAllUsers:async ()=>{
        let result=await User.find()
        return result
    }
}
