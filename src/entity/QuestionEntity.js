export class QuestionEntity {
    constructor({ id, question = '', type = '', options = [] }) {
        this.id = id;
        this.question = question;
        this.type = type;
        this.options = options;
    }
};