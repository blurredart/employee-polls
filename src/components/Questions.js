import { createSelector } from "@reduxjs/toolkit"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ListGroup, Card, CardGroup, Tabs, Tab, Button } from 'react-bootstrap';


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
    const [showAnswered, setShowAnswered] = useState("unanswered");

    return (status === "init" ? "Loading" :
        status === "succeeded" ?
            (<div>
                <Tabs variant="tabs" defaultActiveKey="unanswered" fill>
                    <Tab eventKey="answered" style={{ 'backgroundColor': 'green' }} title="Answered Qns">
                        {
                            answeredQuestions.map(question =>
                            {
                                return <EachQuestion key={question.id} question={question} />
                            })
                        }
                    </Tab>
                    <Tab eventKey="unanswered" title="Un answered Qns">
                        {
                            unansweredQuestions.map(question =>
                            {
                                return <EachQuestion key={question.id} question={question} />
                            })
                        }
                    </Tab>
                </Tabs>
            </div >) : "Error Loading data")
}

function EachQuestion({ question })
{
    let navigate = useNavigate()
    return (
        <>

            <Card bg="success" border="light" text="white" className="rounded-0">
                <Card.Title>{question.optionOne.text.toUpperCase()}</Card.Title>
            </Card>
            <Card bg="danger" border="light" text="white" className="rounded-0">
                <Card.Title>{question.optionTwo.text.toUpperCase()}</Card.Title>
            </Card>
            <Button className='form-control rounded-0' variant='dark' onClick={(e) => navigate(`/questions/${question.id}`)}>View Poll</Button>

        </>
    );
}