import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ADD_QUESTION, ANSWER_QUESTION, FETCH_QUESTIONS } from "../actions/questions";
import { getQuestions } from "../utils/api";

const initialState = {
    questions: {},
    status: "init",
    error: null
};

const fetchQuestionsAsync = createAsyncThunk(FETCH_QUESTIONS, () =>
{
    return getQuestions();
})

const questionsReducer = createReducer(initialState, (builder) =>
{
    builder
        .addCase(ADD_QUESTION, (state, action) =>
        {
            const question = action.payload;
            state.questions[question.id] = question;
        })
        .addCase(ANSWER_QUESTION, (state, action) =>
        {
            const uid = action.payload["user"];
            const qid = action.payload["qid"];
            const answer = action.payload[qid];
            state.questions[qid][answer].votes.push(uid)
        })
        .addCase(fetchQuestionsAsync.fulfilled, (state, action) =>
        {
            state.status = 'succeeded'
            state.questions = action.payload
        })
        .addCase(fetchQuestionsAsync.rejected, (state, action) =>
        {
            state.status = 'failed'
            state.error = action.error.message
        })
})

export { fetchQuestionsAsync, questionsReducer };

