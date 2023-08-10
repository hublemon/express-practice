export class CreatePostDTO{
    title;
    body;
    writer;

    constructor(title, body, writer){
        this.title=title;
        this.body=body;
        this.writer=writer;
    }

    getNewPost(){
        return{
            id: new Date().getTime(),
            title: this.title,
            body: this.body,
            writer: this.writer
        };
    }
}