import
{
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA'

export function getUsers()
{
    return _getUsers()
}

export function getQuestions()
{
    return _getQuestions()
}

export function putQuestion(question)
{
    return _saveQuestion(question)
}

export function putAnswer(answer)
{
    return _saveQuestionAnswer(answer)
}