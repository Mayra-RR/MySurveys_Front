import { QuestionEntity } from './QuestionEntity';

export class SurveyEntity {
    constructor({ id, description = '', questions = [] }) {
        this.id = id;
        this.description = description;
        this.questions = questions.map(q => new QuestionEntity(q));
    }
};