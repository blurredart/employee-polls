import { putQuestion, putAnswer } from '../../utils/api'

// TODO: resolve warning from jest, about "A worker process has failed to exit gracefully..."
describe('test api for _saveQuestion', () =>
{
    it('_saveQuestion saves question to data', async () =>
    {
        const question =
        {
            optionOneText: 'Fundamental Analysis',
            optionTwoText: 'Technical Analysis.',
            author: 'sarahedo'
        };
        let result = await putQuestion(question);
        expect(result.author).toEqual('sarahedo');
        expect(result.optionOne.text).toEqual('Fundamental Analysis');
        expect(result.optionTwo.text).toEqual('Technical Analysis.');
    })

    it('rejects with error if optionOneText is not found', async () =>
    {
        const question =
        {
            optionTwoText: 'Technical Analysis.',
            author: 'sarahedo'
        };
        await expect(putQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });

    it('rejects with error if optionTwoText is not found', async () =>
    {
        const question =
        {
            optionOneText: 'Fundamental Analysis',
            author: 'sarahedo'
        };
        await expect(putQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });

    it('rejects with error if author is not found', async () =>
    {
        const question =
        {
            optionOneText: 'Fundamental Analysis',
            optionTwoText: 'Technical Analysis.',
        };
        await expect(putQuestion(question)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
})

describe('test api for _saveQuestionAnswer', () =>
{
    it('will resolve with success if all data is formatted properly', async () =>
    {
        const authedUser = 'sarahedo';
        const qid = 'vthrdm985a262al8qx3do';
        const answer = 'optionOne';
        await expect(putAnswer({ authedUser, qid, answer })).resolves.toBe(true);
    });

    it('will rejects with error if answer is not found', async () =>
    {
        const authedUser = 'sarahedo';
        const qid = 'vthrdm985a262al8qx3do';
        await expect(putAnswer({ authedUser, qid })).rejects.toEqual('Please provide authedUser, qid, and answer');
    });
})