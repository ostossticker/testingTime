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
        gte: todayStart.toISOString(),
        lt: todayEnd.toISOString()
    },yesterday:{
        gte: yesterdayStart.toISOString(),
        lt: todayStart.toISOString()
    }})
})

app.listen(port , ()=>{
    console.log(`server running ${port}`)
})