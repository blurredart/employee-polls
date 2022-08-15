import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { FETCH_USERS } from "../actions/users";
import { getUsers } from "../utils/api";

const fetchUsersAsync = createAsyncThunk(FETCH_USERS, () =>
{
    return getUsers();
})
const initialState = {
    users: {},
    status: "init",
    error: null
}

const usersReducer = createReducer(initialState, (builder) =>
{
    builder
        .addCase(fetchUsersAsync.fulfilled, (state, action) =>
        {
            state.status = 'succeeded'
            state.users = action.payload;
        })
        .addCase(fetchUsersAsync.rejected, (state, action) =>
        {
            state.status = 'failed'
            state.error = action.error.message
        })
})

export { fetchUsersAsync, usersReducer };

