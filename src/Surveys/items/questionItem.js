export class questionItem {
    constructor({
        id, 
        question = '',
        type = '',
        options = []
    }) 
    {
    this.id = id;
    this.question = question;
    this.type = type;
    this.options = options;
}};