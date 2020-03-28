
import { answerItem } from "./anwserItem"
 export class questionItem {
    constructor({
        id, 
        question = '',
        type = '',
        options = [],
        answer
    }) 
    {
    this.id = id;
    this.question = question;
    this.type = type;
    this.options = options;

    if (answer){
        this.answer = new answerItem(answer);
    }
}};

