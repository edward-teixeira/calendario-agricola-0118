import React, {useContext} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from "../components/AuthForm";
import NavLink from '../components/NavLink';
import {NavigationEvents} from "react-navigation";

const SignUpScreen = ({ navigation }) => {

    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
        >
            <NavigationEvents
                onWillBlur={ clearErrorMessage }
            />

            <AuthForm
                errorMessage={state.errorMessage}
                submitButtonText="Registrar"
                onSubmit={signup}
            />

            <NavLink
                routeName="SignIn"
                buttonTextSubmit="Já possui uma conta?"
            />
        </KeyboardAvoidingView>
    )
};

SignUpScreen.navigationOptions = () => {
    return {
        header: null
    }
};

const styles = StyleSheet.create( {
    container: {
        backgroundColor: '#00E676',
        flex: 1,
        justifyContent: 'center',
    }
});

export default SignUpScreen;
