import React from 'react';

import { Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import * as AxiosHelper from '../helpers/AxiosHelper';

const Signup= ()=>{
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMsg,setErrorMsg]= useState<string>('');
  const router = useRouter();

  const checkAndSignup = async()=>{
    if(username == ''){
      setErrorMsg("Username cannot be empty")
    }else if(password == '' ){
      setErrorMsg("Password cannot be empty")
    }else if(confirmPassword == '' ){
      setErrorMsg("Comfirm password cannot be empty")
    }else if(confirmPassword != password){
      setErrorMsg("Password mismatch")
    }else{
      const userExist = await AxiosHelper.isUsernameExists(username);
      if(userExist){
        setErrorMsg("Username exist")
      }else{
        setErrorMsg("")
        try{
          AxiosHelper.createUser(username,password).then(() => {
            router.push("login")
          });
        }catch(err){
          setErrorMsg("Server error, try later")
        }
        
      }
    }
  }

  return(
  <>
    <Container>
      <Row className='justify-content-center'>
        <Col md={7} lg={5} id="login-panel">
          <h2>Sign Up</h2>
          <Form>
            <Form.Group controlId='formUserName'>
              <Form.Control placeholder='Input username' onChange={(e)=>setUserName(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPassword'>
              <Form.Control type='password' placeholder='Input password' onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId='formPasswordConfirm'>
              <Form.Control type='password' placeholder='Confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <p>{errorMsg}</p>
            <br/>
            <Button className='btn btn-success btn-login' onClick={checkAndSignup}>Sign Up</Button>
            <br/>
          </Form>
        </Col>
      </Row>
    </Container>
  </>
	
)};

export default Signup;
