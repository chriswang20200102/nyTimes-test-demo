
import React, {useState, memo} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button, Alert, OverlayTrigger, Popover} from 'react-bootstrap';
import { signIn, register } from '../actions/userActions'

const SignPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [submitting, setSubmitting] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const updateEmail = (e) => {
        let last = e.timeStamp;
        setTimeout(() => {    //
            if (last - e.timeStamp === 0) {
                const re = /^\w+@[a-z0-9]+\.[a-z]+$/i;
                if (re.test(e.target.value)) {
                    setEmailError(false)
                    setEmail(e.target.value)
                } else {
                    setEmailError(true)
                }
            }
        },1000);
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        let last = e.timeStamp;
        setTimeout(() => {    //
            if (last - e.timeStamp === 0) {
                const re = /^(\w){6,20}$/i;
                if (re.test(e.target.value)) {
                    setPasswordError(false)
                    setPassword(e.target.value)
                } else {
                    setPasswordError(true)
                }
            }
        },1000);
        setEmail(e.target.value)
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        const action = isRegister ? register : signIn
        setSubmitting(true)
        dispatch(action(email, password))
        .then(() => {
            setSubmitting(false)
            history.push('/')
        })
        .catch((error => {
            setSubmitting(false)
            setError(error?.message);
        }));
    };

    return (
        <div className='sign-container'>
            <div className='sign-container-section'>
                <div className="sign-container-section-title">{isRegister? 'Register' : 'Sign'}</div>
                <Form onSubmit={onSubmit} >
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <OverlayTrigger
                            key='left'
                            placement='left'
                            show={emailError}
                            overlay={
                                <Popover id={`popover-positioned-left`}>
                                <Popover.Title as="h3">email validate error</Popover.Title>
                                    <Popover.Content >
                                        Please enter correct email
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <Form.Control type="email" placeholder="email" onChange={updateEmail} required/>
                        </OverlayTrigger>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <OverlayTrigger
                            key='right'
                            placement='right'
                            show={passwordError}
                            overlay={
                                <Popover id={`popover-positioned-right`}>
                                <Popover.Title as="h3">password validate error</Popover.Title>
                                    <Popover.Content >
                                        Verification password: only 6-20 letters, numbers and underscores can be input
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <Form.Control type="password" placeholder="Password" onChange={updatePassword} required/>
                        </OverlayTrigger>
                    </Form.Group>
                    {error && <Alert variant='warning'>{error}</Alert>}
                    <Button variant="primary" type="submit" disabled={!(email && password && !emailError && !passwordError)}>{submitting ? 'Loading' : isRegister ? 'Create Account' : 'Sign In'}</Button>
                    <div className="form-inline">
                        <div className="footer-text">{isRegister ? 'Already have a account?' : 'Don’t have a account?'}</div>
                        <a href='#' onClick={(e) => {
                            e.preventDefault();
                            setIsRegister(!isRegister)
                            setError(null)
                        }}>
                            {isRegister ? 'Sign In' : 'Create Account'}
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default memo(SignPage)