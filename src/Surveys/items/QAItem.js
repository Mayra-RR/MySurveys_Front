
 export class QAItem {
    answer = new Set();

    constructor(survey_id, question_id) {
        this.survey_id = survey_id;
        this.question_id = question_id;
    }

    addAnswer(question, answer) {
        this.answer_id = (question.answer && question.answer.id) ? question.answer.id : undefined;

        // prevents chebbox fields to not collect more than single value
        if (question.type !== 'checkbox' && this.answer.size > 0) {
            delete this.answer;
            this.answer = new Set();
        }

        this.answer.add(answer);
    }

    toDataCollect() {
        return { ...this, answer: [...this.answer] };
    }
}  