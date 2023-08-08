import express from 'express';

const app=express();

app.get("/",(req,res)=>{
    res.send("Node.js강의 좋아요");
});

app.listen(8000,()=>{
    console.log("서버가 시작되었습니다");
});