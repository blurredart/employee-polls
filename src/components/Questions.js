import { createSelector } from "@reduxjs/toolkit"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const selectStatus = store => store.questions.status
const selectQuestions = store => store.questions.questions
const selectUser = store => store.auth.id
const selectQuestionsWithPredicate = (questions, user, answered) =>
{
    const keys = Object.keys(questions).filter(key =>
    {
        const question = questions[key];
        const isAnswered = question.optionOne.votes.includes(user) || question.optionTwo.votes.includes(user);
        return answered ? isAnswered : !isAnswered
    })
    return keys.map(key => questions[key]).sort((a, b) => b.timestamp - a.timestamp)
}
const selectAnsweredQuestions = createSelector([selectQuestions, selectUser],
    (questions, user) =>
    {
        return selectQuestionsWithPredicate(questions, user, true);
    })
const selectUnAnsweredQuestions = createSelector([selectQuestions, selectUser],
    (questions, user) =>
    {
        return selectQuestionsWithPredicate(questions, user, false);
    });
export default function Questions()
{
    const status = useSelector(selectStatus)
    const answeredQuestions = useSelector(selectAnsweredQuestions)
    const unansweredQuestions = useSelector(selectUnAnsweredQuestions)
    const [showAnswered, setShowAnswered] = useState(false);

    return (status === "init" ? "Loading" :
        status === "succeeded" ?
            (<div>
                <button onClick={() => setShowAnswered(true)}>Answered</button>
                <button onClick={() => setShowAnswered(false)}>Un answered</button>
                {
                    showAnswered ? answeredQuestions.map(question =>
                    {
                        return <EachQuestion key={question.id} question={question} />
                    }) : unansweredQuestions.map(question =>
                    {
                        return <EachQuestion key={question.id} question={question} />
                    })
                }
            </div >) : "Error Loading data")
}

function EachQuestion({ question })
{
    let navigate = useNavigate()
    return (<div>
        {question.optionOne.text}
        <br></br>
        {question.optionTwo.text}
        <br></br>
        <button onClick={(e) => navigate(`/questions/${question.id}`)}>view</button>
    </div>);
}