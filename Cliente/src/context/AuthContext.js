import { AsyncStorage } from 'react-native';
import  createDataContext from "./createDataContext";
import calendarioApi from '../api/CalendarioAgro';
//Navigation handler
import { navigate} from "../navigationRef";

const authReducer = ( state, action ) => {

    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup'||'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: ''};
        case 'signout':
            return { token: null, errorMessage: ''}
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');

    if(token){
        dispatch({type: 'signin', payload: token});

        navigate('plantacaoList');
    }else {
        navigate('SignUp');
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'})
};


const signup = dispatch => async ({ email, password}) => {
    try {
        const response = await calendarioApi.post('/signup', {email, password });
        console.log(response.data);
        if(!response.data.success) dispatch({type: 'add_error', payload: response.data.message})
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signup', payload: response.data.token});

        navigate('plantacaoList');
    }catch(e) {
        dispatch({type: 'add_error', payload: "Dados inválidos!"})
    }
};

const signin = dispatch => async ({ email, password}) => {
    try {
        const response = await calendarioApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });

        navigate('plantacaoList');
    }catch(e){
        dispatch({
            type: 'add_error',
            payload: "Houve um erro ao logar"});
    }
};

const signout=  dispatch => async () => {
     await AsyncStorage.removeItem('token');
     dispatch({type: 'signout'});

    navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signup, signout, clearErrorMessage, tryLocalSignin},
    { token: null, errorMessage: '' },
);
