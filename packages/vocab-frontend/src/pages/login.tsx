import React from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Container, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useState } from "react";
import { useRouter } from 'next/router';
import * as AxiosHelper from '../helpers/AxiosHelper'

const Login= (item:any) =>{
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg,setErrorMsg]= useState<string>("");
  const router = useRouter();
  const loginWithPassword = async ()=>{
    const loginResponse = await AxiosHelper.login(username,password)
    if(loginResponse.token && loginResponse.token.length > 0){
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("userId", loginResponse.userId);
      router.push('vocab')
    }else{
      setErrorMsg("Username or password incorrect")
    }
  }
  return(
  <>
    <Container>
      <Row className='justify-content-center'>
        <Col md={7} lg={5} id="login-panel">
          <h2>Sign In</h2>
          <Form>
            <Form.Group controlId='formUserName'>
              <Form.Control placeholder='Input username' onChange={(e)=>setUserName(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPassword'>
              <Form.Control type='password' placeholder='Input password' onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Button className='btn btn-success btn-login' onClick={loginWithPassword}>Login</Button>
            <br/>
            <Form.Group controlId='formRemeberMe'>
              <Form.Check type='checkbox' label='Remeber me'>
              </Form.Check>
            </Form.Group>
            <p>{errorMsg}</p>
          </Form>
          <p><a href="#">Forget password</a><span className="float-right">Not a member? <a href="/signup" className="signup-link">Sign up</a></span></p>
        </Col>
      </Row>
    </Container>
  </>
	
)};

export default Login;
