import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let users=[
    {
        id:1,
        name: "hublemonDev",
        age:21
    }
]; //const하면 안에 것을 삭제는 못하네..

const app=express();

//미들웨어
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true, limit: "700mb"}));

/*
const today=new Date();
const todayToDayjs=dayjs(today).format("YYYY-MM-DD");
console.log({todayToDayjs});

const password="0000";
const hashedPassword=bcrypt.hashSync(password,10);
console.log(hashedPassword);

const token=jwt.sign("1234","dfjkashoo12jpsad");
console.log(token);
*/

//GETMethod
//유저 정보 가져오기
//성공 -> 200
//요청 -> query, path
app.get("/users",(req,res)=>{
    res.status(200).json({users});
});

//POSTMethod
//유저 생성
//성공 -> 201
//요청 -> body
app.post("/users",(req,res)=>{
    const {name, age}=req.body;
    console.log("body: ", req.body);
    users.push({
        id: new Date().getTime(),
        name,
        age
    })
    res.status(201).json({users});
});

//PATCHMethod
//유저 수정
//성공 -> 204
//req.params.id
//요청 -> body
app.patch("/users/:id",(req,res)=>{
    const {id} =req.params;
    const {name,age}=req.body;
    console.log("params: ",req.params);
    const targetUser=users.findIndex((user)=>user.id===Number(id));
    users[targetUser]={
        id: users[targetUser].id,
        name: name?? users[targetUser].name,
        age: age?? users[targetUser].age
    }
    res.status(204).json({});
});

//DELETEMethod
//유저 삭제
app.delete("/users/:id",(req,res)=>{
    const {id}=req.params;
    const deletedUsers = users.filter((user)=>user.id!==Number(id));
    users=deletedUsers;
    res.status(204).json({});
});

// app.get("/",(req,res)=>{
//     res.send("Node.js강의 좋아요");
// });

app.listen(8000,()=>{
    console.log("서버가 시작되었습니다");
});