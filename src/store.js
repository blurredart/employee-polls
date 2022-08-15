import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer.js';
import { questionsReducer } from './reducers/questionsReducer.js';
import { usersReducer } from './reducers/usersReducer.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    questions: questionsReducer
  }
});

export default store