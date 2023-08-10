import express from 'express';
import { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Controllers from './controllers/index.js';

const app=express();

//application middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true, limit: "700mb"}));

Controllers.forEach((controller)=>{
    app.use(controller.path,controller.router);
});

app.use((err,req,res,next)=>{
    res.status(err.status||500).json({message: err.message||"서버 오류가 발생했습니다"});
})

app.get("/",(req,res)=>{
    res.send("Node.js강의 좋아요");
});

app.listen(8000,()=>{
    console.log("서버가 시작되었습니다");
});