import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Leaderboard()
{
    const questionStatus = useSelector(store => store.questions.status)
    const userStatus = useSelector(store => store.questions.status)
    const users = useSelector(store => Object.keys(store.users.users));
    const questions = useSelector(store => store.questions.questions);
    const status = useMemo(() => questionStatus !== "init" && userStatus !== "init", [questionStatus, userStatus]);
    const stats = useSelector(store =>
    {
        if (users.length === 0 || Object.entries(questions).length === 0)
            return;

        // initialize stats
        let stats = {};
        users.forEach(user =>
        {
            stats[user] = {
                asked: 0,
                answered: 0
            }
        });

        // compute stats
        Object.keys(questions).forEach(qid =>
        {
            const question = questions[qid];
            const author = question.author;
            stats[author].asked += 1;
            question.optionOne.votes.forEach(user =>
            {
                stats[user].answered += 1
            })
            question.optionTwo.votes.forEach(user =>
            {
                stats[user].answered += 1
            })
        })

        return stats;
    })
    const sortedUsers = useSelector(store =>
    {
        let sortedUsers = [...users]
        sortedUsers.sort((user1, user2) =>
        {
            const user1Total = stats[user1].asked + stats[user1].answered;
            const user2Total = stats[user2].asked + stats[user2].answered;
            return user2Total - user1Total
        })
        return sortedUsers
    })


    return status ? (<div >
        <table>
            <thead>
                <tr>
                    <td>User</td>
                    <td>Asked</td>
                    <td>Answered</td>
                </tr>
            </thead>
            <tbody>
                {
                    sortedUsers.map((user, index) =>
                    {
                        return (<tr key={index}>
                            <td>{user}</td>
                            <td>{stats[user].asked}</td>
                            <td>{stats[user].answered}</td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
    </div>) : <div>Loading data...</div>
}