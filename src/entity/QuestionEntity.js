import { AnswerEntity } from "./AnswerEntity";

export class QuestionEntity {
    constructor({ id, question = '', type = '', options = [], answer}) {
        this.id = id;
        this.question = question;
        this.type = type;
        this.options = options;

        if (answer) {
            this.answer = new AnswerEntity(answer);
        }
    }
};