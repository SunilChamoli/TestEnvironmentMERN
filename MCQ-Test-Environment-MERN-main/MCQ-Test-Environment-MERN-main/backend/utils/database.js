
const mongoose= require('mongoose')


const  dotenv = require('dotenv')

dotenv.config({
    path:".env"

})
// mongodb+srv://net:net@cluster0.khcix7i.mongodb.net/user


const databaseConnection =() =>{
    mongoose.connect(process.env.mongoURI).then(()=>{
     console.log("momgodb connected")
    }).catch((error)=>{
        console.log(error)
    })

    }

    module.exports=databaseConnection
