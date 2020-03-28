import { QAItem } from './QAItem';

// dataform is a map of surveys
const surveyDataForms = new Map();

export class dataContainer {
    static getSurvey(survey_id) {
        // ensure survey is a Map too
        if (!surveyDataForms.has(survey_id)) {
            surveyDataForms.set(survey_id, new Map());
        }

        return surveyDataForms.get(survey_id);
    }

    static getQuestionAnswers(survey_id, question_id) {
        // get ref to survey question map
        const survey = dataContainer.getSurvey(survey_id);

        // ensure survey question answer is an array
        if (!survey.has(question_id)) {
            survey.set(question_id, new QAItem(survey_id, question_id));
        }

        return survey.get(question_id);
    }

    static addAnswer(survey_id, question, answer) {
        // get ref to surveyQuestionAnswer instance
        const questionAnswer = dataContainer.getQuestionAnswers(survey_id, question.id);

        // add answer
        questionAnswer.addAnswer(question, answer);
    }

    static collectSurveyData(survey_id) {
        const survey = dataContainer.getSurvey(survey_id);
        const dataCollecter = [];

        survey.forEach((questionAnswer) => {
            dataCollecter.push(questionAnswer.toDataCollect())
        });

        return dataCollecter;
    }

    static clearSurvey(survey_id) {
        const survey = dataContainer.getSurvey(survey_id);

        // to avoid memory leaks delete nested Map's
        survey.forEach((...args) => {
            const [, question_id] = args;

            survey.delete(question_id);
        });

        // as  well the specific key
        surveyDataForms.delete(survey_id);
    }
} 