import { useEffect, useState } from "react";
import { Button, NavDropdown, Col, FormGroup, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { doLogin, LOGOUT } from "../actions/auth";

export default function Login()
{
    const user = useSelector(store => store.auth.id);

    return (user !== "" ?
        (<>
            <Menu name={user} />
            <Outlet />
        </>) : <SelectUser />)
}

function Menu({ name })
{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">EMPLOYEE POLLS</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
                    <Nav.Link as={Link} to="/add">Ask Question</Nav.Link>
                </Nav>
                <Navbar.Text>
                    {name}
                </Navbar.Text>
                <Nav>
                    <Nav.Link title={name} as={Link} to="/" onClick={() =>
                    {
                        dispatch(LOGOUT);
                        navigate('/')
                    }}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar >)
}
function SelectUser()
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
        (
            <>
                < Form.Select variant="dark" name="users" id="user-select" onChange={(e) => setUser(e.target.value)}>
                    {
                        Object.keys(users).map(id =>
                        {
                            let tuser = users[id];
                            return <option value={tuser.id} key={id}>{tuser.name}</option>
                        })
                    }
                </Form.Select>
                <Button className="form-control" variant="dark" type="submit" onClick={handleLogin}>Login</Button>
            </>
        )
    )
}