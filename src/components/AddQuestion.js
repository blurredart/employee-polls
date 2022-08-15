import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuestion } from "../actions/questions";
import { putQuestion } from "../utils/api";

export default function AddQuestion()
{
    const user = useSelector(store => store.auth.id)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");

    const handleAddQuestion = () =>
    {
        if (!optionOne)
            alert('please enter option one')

        if (!optionTwo)
            alert('please enter option two')

        dispatch(async () =>
        {
            const question = await putQuestion({ optionOneText: optionOne, optionTwoText: optionTwo, author: user })
            dispatch(addQuestion(question))
        })

        navigate("/")
    }
    return (
        <div>
            <label htmlFor="optionOne">option One</label>{' '}
            <input type="text" id="optionOne" value={optionOne} onChange={(e) => setOptionOne(e.target.value)} />
            <br></br>
            <label htmlFor="optionTwo">option Two</label>{' '}
            <input type="text" id="optionOne" value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} />
            <br></br>
            <button onClick={handleAddQuestion} type="submit">Submit</button>
        </div>
    )
}