import { Router } from "express";
import { PostDTO, CreatePostDTO } from "./dto/index.js";

class PostController{
    router;
    path="/posts";
    posts=[{
        id: 1,
        title: "KT vs T1",
        body: "T1 서머 도장깨기 했으면 좋겠다",
        writer: "hublemonDev"
    }];

    constructor(){
        this.router=Router();
        this.init();
    }

    init(){
        this.router.get("/",this.getPosts.bind(this));
        this.router.get("/details/:id",this.getPost.bind(this));
        this.router.post("/",this.putPost.bind(this));
        this.router.patch("/details/:id",this.patchPost.bind(this));
        this.router.delete("/details/:id",this.deletePost.bind(this));
    }

    getPosts(req,res,next){
        try{
            const posts=this.posts.map((post)=>new PostDTO(post));
            //res.status(200).json({posts: this.posts});
            res.status(200).json({posts});
        }catch(err){
            next(err);
        }
    }
    getPost(req,res,next){
        try{
            const id=req.params.id;
            const targetPost=this.posts.find((post)=>post.id===Number(id));
            if(!targetPost){
                throw{status:404, message: "게시글을 찾을 수 없습니다."};
            }
            const post=new PostDTO(targetPost);
            res.status(200).json({ post });
        }catch(err){
            next(err);
        }
    }
    putPost(req,res,next){
        try{
            const {title, body, writer}=req.body;
            if(!title||!body||!writer){
                throw {status: 400, message: "게시글 정보가 부족합니다."};
            }
            const post=new CreatePostDTO(title,body,writer).getNewPost();
            this.posts.push(post);
            const posts=this.posts.map((post)=>post=new PostDTO(post));
            //res.status(201).json({posts: this.posts});
            res.status(201).json({posts});
        }catch(err){
            next(err);
        }
    }
    patchPost(req,res,next){
        try{
            const id=req.params.id;  //string
            const post=this.post.find((post)=>post.id===Number(id));
            if(!post){
                throw {status: 404, message: "게시글을 찾을 수 없습니다."};
            }
            const {title,body,writer}=req.body;
            const postIdx=this.posts.findIndex((post)=>post.id===Number(id));
            this.posts[postIdx]={
                id: Number(id), //숫자
                title: title??this.posts[postIdx].title,
                body: body??this.posts[postIdx].body,
                writer: writer??this.posts[postIdx].writer
            };
            res.status(204).json({});            
        } catch(err){
            next(err);
        }
    }
    deletePost(req,res,next){
        try{
            const id=req.params.id;
            const post=this.post.find((post)=>post.id===Number(id));
            if(!post){
                throw {status: 404, message: "게시글을 찾을 수 없습니다."};
            }
            const deletedPosts=this.posts.filter((post)=>post.id!==Number(id));
            this.posts=deletedPosts;
            res.status(204).json({});
        } catch(err){
            next(err);
        }
    }
}

const postController=new PostController();

export default postController;