import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import Spacer from './Spacer';
//Gives all the views access to the information here
import { withNavigation } from 'react-navigation'


const NavLink = ({ navigation , buttonTextSubmit,  routeName }) => {

    return (
        <Spacer>
            <TouchableOpacity
                onPress={() => navigation.navigate({ routeName })}
            >
                <Text style={styles.register}>{buttonTextSubmit}</Text>
            </TouchableOpacity>
        </Spacer>
    )
};

const styles = StyleSheet.create({
                    register: {
                    color: '#424242',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 10,
                    textDecorationLine: 'underline',
                    includeFontPadding: true,
                    }
});

export default withNavigation(NavLink);
