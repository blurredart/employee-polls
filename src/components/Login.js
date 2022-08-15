import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { doLogin } from "../actions/auth";

export default function Login()
{
    const user = useSelector(store => store.auth.id);
    return (user !== "" ?
        (<>
            <Link to='/'>Home</Link>{" "}
            <Link to='/leaderboard'>Leaderboard</Link>{" "}
            <Link to='/add'>Add Question</Link>
            <Outlet />
        </>) : <UserSelector />)
}

function UserSelector()
{

    const [user, setUser] = useState("");
    const users = useSelector(store => store.users.users);
    const status = useSelector(store => store.users.status);
    const dispatch = useDispatch();

    useEffect(() =>
    {
        if (status !== "init" && users !== {})
            setUser(Object.keys(users)[0])
    }, [status, users])

    const handleLogin = () =>
    {
        dispatch(doLogin(user));
    }
    return (status === "init" ?
        <div>Loading...</div> :
        (<>
            < select name="users" id="user-select" onChange={(e) => setUser(e.target.value)}>
                {
                    Object.keys(users).map(id =>
                    {
                        let tuser = users[id];
                        return <option value={tuser.id} key={id}>{tuser.name}</option>
                    })
                }
            </select >
            <br></br>
            <button onClick={handleLogin}>Login</button>
        </>
        ))
}