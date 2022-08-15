import { createAction } from '@reduxjs/toolkit';

const FETCH_QUESTIONS = "fetchQuestions"
const ADD_QUESTION = "addQuestion";
const ANSWER_QUESTION = "answerQuestion"

const addQuestion = createAction(ADD_QUESTION, function prepare(question)
{
    return {
        payload: question
    }
})

const answerQuestion = createAction(ANSWER_QUESTION, function prepare(user, qid, answer)
{
    return {
        payload: {
            user,
            qid,
            [qid]: answer
        }
    }
})

export { addQuestion, answerQuestion, ADD_QUESTION, ANSWER_QUESTION, FETCH_QUESTIONS };

