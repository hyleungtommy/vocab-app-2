import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginConnector from '@/connector/LoginConnector';
import LoginComponent from '@/connectedPages/LoginComponent';

const Login : React.FC =() => {
  const ConnectedLogin = LoginConnector(LoginComponent);
  return <ConnectedLogin/>
}

export default Login;
