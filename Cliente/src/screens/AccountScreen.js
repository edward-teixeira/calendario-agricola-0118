import React,{ useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-navigation';
const AccountScreen = () => {

    const { signout } = useContext(AuthContext);

    return (
        <SafeAreaView
            forceInset={{top: 'always'}}
        >
        <View
            style={styles.container}
        >
            <TouchableOpacity
              style={styles.button}
              onPress={signout}
            >
               <Text style={styles.text}>Sair</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create( {
    button: {
        width: 150,
        height: 30,
        borderWidth: 1,
        borderColor: '#fafafa',
        backgroundColor:'#424242',
        alignSelf: 'center',
        margin: 200
    },
     text: {
         alignSelf: 'center',
         color: '#fafafa',
         margin: 5,
         alignContent: 'center',
         fontSize: 16
     },
     container: {
        backgroundColor: '#00E676',
         height: 600,
     }

});

export  default AccountScreen;
