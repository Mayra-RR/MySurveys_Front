import { QuestionAnswerEntity } from '../entity/QuestionAnswerEntity';

// dataform is a map of surveys
const surveyDataForms = new Map();

export class SurveyDataContainer {
    static getSurvey(survey_id) {
        // ensure survey is a Map too
        if (!surveyDataForms.has(survey_id)) {
            surveyDataForms.set(survey_id, new Map());
        }

        return surveyDataForms.get(survey_id);
    }

    static getQuestionAnswers(survey_id, question_id) {
        // get ref to survey question map
        const survey = SurveyDataContainer.getSurvey(survey_id);

        // ensure survey question answer is an array
        if (!survey.has(question_id)) {
            survey.set(question_id, new QuestionAnswerEntity(survey_id, question_id));
        }

        return survey.get(question_id);
    }

    static addAnswer(survey_id, question, answer) {
        // get ref to surveyQuestionAnswer instance
        const questionAnswer = SurveyDataContainer.getQuestionAnswers(survey_id, question.id);

        // add answer
        questionAnswer.addAnswer(question, answer);
    }

    static prepareSurveyPayload(survey_id) {
        const survey = SurveyDataContainer.getSurvey(survey_id);
        const payload = [];

        survey.forEach((questionAnswer) => {
            payload.push(questionAnswer.toPayload())
        });

        return payload;
    }

    static clearSurvey(survey_id) {
        const survey = SurveyDataContainer.getSurvey(survey_id);

        // to avoid memory leaks delete nested Map's
        survey.forEach((...args) => {
            const [, question_id] = args;

            survey.delete(question_id);
        });

        // as  well the specific key
        surveyDataForms.delete(survey_id);
    }
}