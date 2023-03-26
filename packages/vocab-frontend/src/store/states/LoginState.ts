export interface LoginState {
    username: string;
    password: string;
    errorMsg: string | null;
}

export interface LoginDispatch {
    setUsername: (username: string) => { type: string; payload: string; };
    setPassword: (password: string) => { type: string; payload: string; };
    setErrorMsg: (errorMsg: string) => { type: string; payload: string | null; };
}

export const initialLoginState: LoginState = {
    username: '',
    password: '',
    errorMsg: null
};