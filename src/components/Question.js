import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { answerQuestion } from "../actions/questions";
import { putAnswer } from "../utils/api";
import
{
    Card, Container, Table,
    CardGroup, ButtonGroup, ToggleButton, Button, Row, Col, Form, FormLabel, ListGroup
} from 'react-bootstrap';

const selectStatus = store => store.questions.status

export default function Question()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const questionStatus = useSelector(selectStatus)
    const user = useSelector(store => store.auth.id)
    const question = useSelector(store => store.questions.questions[id])
    const users = useSelector(store => store.users.users)
    const [option, setOption] = useState("")
    const [author, setAuthor] = useState("")

    useEffect(() =>
    {
        if (!question && questionStatus !== "init")
        {
            navigate("/404")
        }
    }, [question, navigate, questionStatus])

    useEffect(() => 
    {
        /* Load avatar */
        if (question && users)
        {
            const uid = question.author;
            setAuthor(users[uid])
        }
    }, [users, question])

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
    return ((questionStatus === "init") ?
        (<div>"Loading..."</div>) :
        (<Fragment>
            {
                (!question)
                    ? <div> Redirecting.. </div>
                    : (<div>
                        {
                            (question.optionOne.votes.includes(user) || question.optionTwo.votes.includes(user))
                                ?
                                <div>
                                    <QuestionStats question={question} user={user} />
                                </div>
                                : <>
                                    <Card bg='dark' text="white" className="rounded-0">
                                        <Row className="d-flex justify-content-start">
                                            <Col className="col-md-1 col-xs-1">
                                                {author ? <Card.Img style={{ height: '60px' }} src={author.avatarURL} alt="User avatar" /> : <div>Loading Avatar..</div>}
                                            </Col>
                                            <Col >
                                                <Card.Subtitle >
                                                    {author ? author.name : ""} asked
                                                </Card.Subtitle>
                                                <Card.Title>
                                                    Would you rather ?
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Card bg='dark' text="white" className="rounded-0">
                                        <ButtonGroup vertical >
                                            <ToggleButton id="optionOne" className="rounded-0" type="radio" variant='outline-success' checked={option === "optionOne"} name="answer" onChange={(e) => setOption(e.currentTarget.value)} value="optionOne">
                                                {question.optionOne.text.toUpperCase()}
                                            </ToggleButton>
                                            <ToggleButton id="optionTwo" className="rounded-0" type="radio" variant='outline-danger' checked={option === "optionTwo"} name="answer" onChange={(e) => setOption(e.currentTarget.value)} value="optionTwo">
                                                {question.optionTwo.text.toUpperCase()}
                                            </ToggleButton>
                                            <Button variant="dark" className="form-control" type="submit" onClick={handleOptionSelect}>SUBMIT</Button>
                                        </ButtonGroup>
                                    </Card>
                                </>
                        }
                    </div >)
            }
        </Fragment >))
}

function QuestionStats({ question, user })
{
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePcnt = Math.round((optionOneVotes / totalVotes) * 100);
    const optionTwoPcnt = Math.round((optionTwoVotes / totalVotes) * 100);
    const authorVote = question.optionOne.votes.includes(user) ? "optionOne" : "optionTwo";
    const style = {
        'background-color': '#ffa',
        'color': 'black'
    }
    return (
        <>
            <Card bg="dark" text="white" className="rounded-0">
                <Card.Title >
                    Would you rather ?
                </Card.Title>

            </Card >
            <Table bordered variant="dark" size="sm">
                <tbody>
                    <tr >
                        <td style={authorVote === "optionOne" ? style : {}}>
                            {question.optionOne.text.toUpperCase()}
                        </td>
                        <td style={authorVote === "optionOne" ? style : {}}>
                            {optionOneVotes} {optionOneVotes === 1 ? 'person' : 'people'} voted
                        </td>
                        <td style={authorVote === "optionOne" ? style : {}}>
                            {optionOnePcnt}%
                        </td >
                    </tr>
                    <tr>
                        <td style={authorVote === "optionTwo" ? style : {}}>
                            {question.optionTwo.text.toUpperCase()}
                        </td>
                        <td style={authorVote === "optionTwo" ? style : {}}>
                            {optionTwoVotes} {optionTwoVotes === 1 ? 'person' : 'people'} voted
                        </td>
                        <td style={authorVote === "optionTwo" ? style : {}}>
                            {optionTwoPcnt}%
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}