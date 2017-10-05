
//last time worked on report
export class Inquiry{
    constructor(
        public ApplicationName:string,
        public TableName:string,
        public Action:string,
        public UserName:string
    ){
    }
}

//last time worked on report
export class InquiryResponse{
    constructor(
        public Result:boolean,
        public Message:string
    ){
    }
}