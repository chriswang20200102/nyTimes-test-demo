import React, {memo} from 'react'
import {useSelector} from 'react-redux'
import {NavLink, useRouteMatch } from "react-router-dom"
import {Navbar, Nav, Container, Form } from 'react-bootstrap'
import SearchInput from '../component/SearchInput'

const Header = () => {
    const hideHeder = useRouteMatch("/signIn")
    const email = useSelector(state => state.user.email)
    if (hideHeder) return null
    

    return (
        <Container>
              <Navbar bg="primary" variant="dark" fixed="top" expand="md">
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Navbar.Brand href="/">NY news</Navbar.Brand>
                        <Nav className="mr-auto">
                            <NavLink to="/" exact={true} className="nav-link" key="/">Home</NavLink>
                            <NavLink to="/section/world" exact={true} className="nav-link" key="/section/world">World</NavLink>
                            <NavLink to="/section/science" exact={true} className="nav-link" key="/section/science">Science</NavLink>
                        </Nav>
                        <Form inline>
                            <SearchInput/>
                        </Form>
                    </Navbar.Collapse>
                {!email && 
                    <NavLink to='/signIn' className="login-link">Login</NavLink>
                }
                {email && <span className="login-email">{email}</span>}
            </Navbar>
        </Container>
    )
}

export default memo(Header)

