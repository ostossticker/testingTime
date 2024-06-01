import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())
const port = process.env.PORT

app.get('/',(req,res)=>{
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    return res.status(200).json({today:{
        gte: yesterdayStart.toISOString(),
        lt: todayStart.toISOString()
    },yesterday:{
        gte:new Date( today.getFullYear(), todayStart.getMonth() ,todayStart.getDate() - 2,0).toISOString(),
        lt:new Date(todayEnd.getFullYear(), todayStart.getMonth() ,todayStart.getDate() - 1,0).toISOString()
    }})
})

app.listen(port , ()=>{
    console.log(`server running ${port}`)
})