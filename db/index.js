const mongoose=require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/movieshub')
.then(()=>{
    console.log("mongoDb SucessFully Running ")
}).catch((err)=>{
    console.log("MongoDb Err",err)
})