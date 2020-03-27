export class AnswerEntity {
    constructor({id, answer, question_id}) {
        this.id = id;
        this.answer = answer;
        this.question_id = question_id;
    }
}