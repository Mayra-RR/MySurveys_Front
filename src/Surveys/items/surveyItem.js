import { questionItem } from './questionItem';

export class surveyItem {
    constructor({
            id,
            description = '',
            questions = []
        })
        { 
           this.id = id;
           this.description = description;
           this.questions = questions.map(question => new questionItem(question));
        }
};
