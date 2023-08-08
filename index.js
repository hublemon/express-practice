import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const app=express();

app.use(cors());
app.use(helmet());

const today=new Date();
const todayToDayjs=dayjs(today).format("YYYY-MM-DD");
console.log({todayToDayjs});

const password="0000";
const hashedPassword=bcrypt.hashSync(password,10);
console.log(hashedPassword);

const token=jwt.sign("1234","dfjkashoo12jpsad");
console.log(token);

app.get("/",(req,res)=>{
    res.send("Node.js강의 좋아요");
});

app.listen(8000,()=>{
    console.log("서버가 시작되었습니다");
});