const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        user_pass: {
            type: String,
            required: true,
            trim: true
        },
        user_email: {
            type: String,
            required: true,
            trim: true
        },
        pic:{
            type:String,
            // require:true,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfHVThC6NDvAo7W_aBedFmduYaNv6oXl-5T0lykgFHRoznpF85SfTb5c17nw9LqJVY94&usqp=CAU"
        }
    },
    {
        timestamps:true
    }
)
const User = new mongoose.model("user" , userSchema);
module.exports= User;