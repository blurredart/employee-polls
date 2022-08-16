import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import notfound from '../images/404.svg';
import { fetchQuestionsAsync } from "../reducers/questionsReducer.js";
import { fetchUsersAsync } from "../reducers/usersReducer";
import AddQuestion from "./AddQuestion.js";
import Leaderboard from "./Leaderboard.js";
import Login from './Login.js';
import Question from './Question';
import Questions from "./Questions.js";

function App()
{
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(fetchQuestionsAsync());
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    return (
        <>

            <Routes>
                <Route element={<Login />}>
                    <Route path="/" element={<Questions />} />
                    <Route path="/questions/:id" element={<Question />} />
                    <Route path="/add" element={<AddQuestion />}></Route>
                    <Route path="/leaderboard" element={<Leaderboard />}></Route>
                </Route>
                <Route
                    path="/*"
                    element={<img src={notfound} alt="404 Page not found" />}
                />
            </Routes>
        </>);
}
export default App;
