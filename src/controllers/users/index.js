import { Router } from "express";
import { UserDTO, CreateUserDTO } from "./dto/index.js";

class UserController{
    router;
    path="/users";
    users=[
        {
            id: 1,
            name: "hublemonDev",
            age: 21
        },
    ];
    
    constructor(){
        this.router=Router();
        this.init();
    }

    init(){
        this.router.get("/",this.getUsers.bind(this));
        this.router.get("/details/:id",this.getUser.bind(this));
        this.router.post("/",this.putUser.bind(this));
    }
    getUsers(req,res,next){
        try{
            const users =this.users.map((user)=>new UserDTO(user));
            //res.status(200).json({users : this.users});
            res.status(200).json({ users });
        } catch(err){
            next(err);
        }
        
    }
    getUser(req,res,next){
        try{
            const {id}=req.params;
            const targetUser=this.users.find((user)=>user.id===Number(id));
            if(!targetUser){
                throw {status:404, message: "유저를 찾을 수 없습니다."};
            }
            const user=new UserDTO(targetUser);
            res.status(200).json({user});
        }catch(err){
            next(err);
        }
        
    }
    putUser(req,res, next){
        try{
            const {name,age}=req.body;
            if(!name||!age){
                throw {status:400, message: "유저 정보가 부족합니다"}
            }
            const user=new CreateUserDTO(name,age).getNewUser();
            this.users.push(users);
            const users=this.users.map((user)=>new UserDTO(user));
            res.status(201).json({users});
        }catch(err){
            next(err);
        }
        
    }
}

const userController=new UserController();
export default userController;