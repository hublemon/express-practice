export class PostDTO{
    id;
    title;
    body;
    writer;
    
    constructor(post){
        this.id=post.id;
        this.title=post.title;
        this.body=post.body;
        this.writer=post.writer;
    }
}