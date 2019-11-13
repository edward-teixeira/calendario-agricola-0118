import React, {useContext, useEffect} from "react";
import { Context as AuthContext } from '../context/AuthContext';
import { View, Text, Input } from 'react-native';

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    },[]);

    return null;
};

export default ResolveAuthScreen;
