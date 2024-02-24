const mongoose = require("mongoose");

try {
    // 'mongodb+srv://deepgagan7400:Gagan5205@@cluster0.wljghfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    mongoose.connect('mongodb+srv://deepgagan7400:Gagan5205%40@cluster0.wljghfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(
            () => { console.log("Connection created")}
        )
        .catch((err) => { console.log("Connection Unsuccessful",err) })
} catch (error) {
    console.log("Mongoose Connectivity Error",error)
}
// finally { console.log("try catch") }

module.exports = mongoose;