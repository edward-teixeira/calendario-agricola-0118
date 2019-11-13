import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView} from "react-native";
import Spacer from "../components/Spacer";

const ColheitaScreen = () => {
    return (
        <SafeAreaView>
            <Spacer>
        <Text
            style={{ fontSize: 48}}
        >Colheita Screen</Text>
            </Spacer>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create( {

});

export default ColheitaScreen;
