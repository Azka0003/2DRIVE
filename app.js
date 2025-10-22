//1.
// const express = require('express')
// const app =express()

// app.set("view engine","ejs")

// app.get('/',(req,res)=>{
//     res.send("Hello");
// })

// app.listen(3000,()=>{
//     console.log('Server is running on port 3000')
// })





//2.
const express = require('express')
const userRouter = require('./routes/user.routes')
const dotenv=require('dotenv')
dotenv.config()
const connectToDB=require('./config/db')
connectToDB()
const cookieparser=require('cookie-parser')
const app =express()
const indexRouter=require('./routes/index.routes')
const uploadRoutes = require("./routes/upload.routes");//hi



app.set("view engine","ejs")
app.use(cookieparser())//app.use ke andr jitne bhi middleware aayenge unsbko call krna hoga ...()aise

app.use('/',indexRouter)
app.use('/user',userRouter)
app.use("/upload", uploadRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})