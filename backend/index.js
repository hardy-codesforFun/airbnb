const connectToDb=require('./connectToDb');
const express=require('express');
const cors=require('cors');
const userRouter=require('./routes/user');
const bookingRouter=require('./routes/booking');
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/user',userRouter);
app.use('/api/v1/booking',bookingRouter);
connectToDb();
app.listen(3000,()=>{
    console.log('Server started on port 3000');
})
