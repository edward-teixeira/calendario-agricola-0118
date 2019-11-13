import React, { useState, useContext } from 'react';
import {View, StyleSheet, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Alert  } from 'react-native';
import { Text, Input, Button, Image, Icon, Tooltip} from 'react-native-elements';
import Spacer from "../components/Spacer";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignInScreen = () => {

    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
        >
            <NavigationEvents
                onWillBlur={ clearErrorMessage }
                />
            <AuthForm
                submitButtonText="Entrar"
                onSubmit={signin}
                errorMessage={state.errorMessage}
            />
            <NavLink
                buttonTextSubmit="Não possui uma conta?"
                routeName="SignUp"
            />

        </KeyboardAvoidingView>
    )
};

SignInScreen.navigationOptions = () => {
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

export  default SignInScreen;
