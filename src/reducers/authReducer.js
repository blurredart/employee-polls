import { createReducer } from "@reduxjs/toolkit";
import { LOGIN, LOGOUT } from "../actions/auth";
const initialState = {
    id: ""
}
const authReducer = createReducer(initialState, (builder) =>
{
    builder
        .addCase(LOGIN, (state, action) =>
        {
            state.id = action.payload
        })
        .addCase(LOGOUT, (state, action) =>
        {
            state.id = "";
        })
})

export default authReducer