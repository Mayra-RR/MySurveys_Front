import { answerItem } from './anwserItem';

export class answerContainer {
    data = [];

    putAnswer(question_id, answer){
        this.data.push( new answerItem(answer))
    }
    getAnswers(){
        return this.data;
    }
}