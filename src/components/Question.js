import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { answerQuestion } from "../actions/questions";
import { putAnswer } from "../utils/api";

const selectStatus = store => store.questions.status

export default function Question()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const status = useSelector(selectStatus)
    const user = useSelector(store => store.auth.id)
    const question = useSelector(store => store.questions.questions[id])
    const [option, setOption] = useState("")

    useEffect(() =>
    {
        /* Once data is loaded and qid is invalid */
        if (!question && status !== "init")
        {
            navigate("/404")
        }
    }, [question, navigate, status])

    const handleOptionSelect = () =>
    {
        if (!option)
            alert('please vote before you submit')

        dispatch(async () =>
        {
            console.log("ADDING ANSWER")
            await putAnswer({ authedUser: user, qid: id, answer: option })
            dispatch(answerQuestion(user, id, option))
        })
    }
    return ((status === "init") ?
        (<div>"Loading..."</div>) :
        (<Fragment>
            {
                (!question)
                    ? <div> Redirecting.. </div>
                    : (<div>
                        {
                            (question.optionOne.votes.includes(user) || question.optionTwo.votes.includes(user)) ?
                                <div>You have Answered this question
                                    <DisplayQuestion question={question} />
                                </div>
                                : <div> Would you rather ?
                                    <br />
                                    <input onChange={() => setOption("optionOne")} id="optionOne" name="answer" type="radio" value={question.optionOne.text} />
                                    <label htmlFor="optionOne">{question.optionOne.text}</label>
                                    <br />
                                    <input onChange={() => setOption("optionTwo")} id="optionTwo" name="answer" type="radio" value={question.optionTwo.text} />
                                    <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                                    <br />
                                    <button type="submit" onClick={handleOptionSelect}>submit</button>
                                </div>
                        }

                    </div >)
            }
        </Fragment>))
}

function DisplayQuestion({ question })
{
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePcnt = Math.round((optionOneVotes / totalVotes) * 100);
    const optionTwoPcnt = Math.round((optionTwoVotes / totalVotes) * 100);

    console.log(optionOneVotes, optionTwoVotes, totalVotes, optionOnePcnt, optionTwoPcnt)
    return (<div>
        <br />
        {question.optionOne.text} - {optionOnePcnt}%
        <br />
        {question.optionTwo.text} - {optionTwoPcnt}%
    </div>)
}