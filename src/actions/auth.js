import { createAction } from "@reduxjs/toolkit";
const LOGIN = "login";
const LOGOUT = "logout";

const doLogin = createAction(LOGIN);
const doLogout = createAction(LOGOUT);

export { LOGIN, LOGOUT, doLogin, doLogout };

