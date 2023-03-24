import { connect } from 'react-redux';
import { RootState } from '../store/states/RootState';

const mapStateToProps = (state: RootState) => ({
    username: state.login.username,
    password: state.login.password,
    errorMsg: state.login.errorMsg
});

const mapDispatchToProps = {
    setUsername: (username:string) => ({ type: 'SET_USERNAME', payload: username }),
    setPassword: (password: string) => ({ type: 'SET_PASSWORD', payload: password }),
    setErrorMsg: (errorMsg: string | null) => ({ type: 'SET_ERROR_MSG', payload: errorMsg })
};

export default connect(mapStateToProps, mapDispatchToProps);