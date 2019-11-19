import React, {useState} from "react";
import {Image, Input, Text} from 'react-native-elements';
import Spacer from "./Spacer";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableOpacity
} from "react-native";


const AuthForm = ({ errorMessage, onSubmit, submitButtonText }) => {
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Image
                    style={{width: 200, height: 200}}
                    source={require('../assets/leaf-icon.png')}
                    PlaceholderContent={<ActivityIndicator/>}
                />
            </Spacer>
            <Spacer>
                <Text
                    style={styles.title}
                    h3>GROWTH</Text>
            </Spacer>
            <Spacer>
                <Input
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholderTextColor={'#e0e0e0'}
                    errorStyle={{ color: 'red' }}
                    leftIcon={{type: 'material', name: 'mail-outline'}}
                    value={email}
                    placeholder="Email"
                    onChangeText={setEmail}
                />
            </Spacer>
            <Spacer>
                <Input
                    secureTextEntry
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholderTextColor={'#e0e0e0'}
                    errorStyle={{ color: 'red' }}
                    placeholder="Senha"
                    leftIcon={{type: 'material', name: 'lock'}}
                    value={password}
                    onChangeText={setPassword}
                />
            </Spacer>
            {
                errorMessage ?
                        <Text style={styles.errorMessage}>{ errorMessage }</Text>
                    : null
            }
            <Spacer>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => {
                        onSubmit({ email, password });
                        setPassword('');
                        setEmail('');
                    }}
                >
                    <Text style={styles.botaoText}>{submitButtonText}</Text>
                </TouchableOpacity>
            </Spacer>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00E676',
        flex: 1,
        justifyContent: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    register: {
        color: '#424242',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        textDecorationLine: 'underline',
        includeFontPadding: true,
    },
    title: {
        paddingBottom: 10,
        textAlign: 'center',
        color: '#424242',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 3
    },
    botao: {
        shadowColor: '#424242',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
        width: 300,
        height: 42,
        color: '#00e575',
        backgroundColor: '#626262',
        borderColor: '#FAFAFA',
        borderWidth: 2,
        marginBottom: 30,
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fafafa',
        textAlign: 'center',
    }
});

export default AuthForm;
