import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { addQuestion } from "../actions/questions";
import { putQuestion } from "../utils/api";
import { Form, Button } from 'react-bootstrap';

export default function AddQuestion()
{
    const user = useSelector(store => store.auth.id)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    let location = useLocation();

    if (!location.state)
    {
        return (<Navigate to="/404" />)
    }
    else
    {
        window.history.replaceState({}, '')
    }

    const handleAddQuestion = (e) =>
    {
        e.preventDefault();
        if (!optionOne)
        {
            alert('Please enter option one')
            return
        }
        if (!optionTwo)
        {
            alert('Please enter option two')
            return
        }
        dispatch(async () =>
        {
            const question = await putQuestion({ optionOneText: optionOne, optionTwoText: optionTwo, author: user })
            dispatch(addQuestion(question))

        })
        navigate("/")
    }

    return (
        <Form>
            <Form.Group>
                <Form.Control type="text" placeholder="Enter Option One" id="optionOne" value={optionOne} onChange={(e) => setOptionOne(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" placeholder="Enter Option Two" id="optionOne" value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} />
            </Form.Group>
            <Button variant="dark" className="form-control" onClick={handleAddQuestion} type="submit">Submit</Button>
        </Form>
    )
}