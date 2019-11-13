import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import CreatePlantacaoForm from "../components/CreatePlantacaoForm";

const PlantacaoCreateScreen = ({ navigation }) => {
    return (
        <View>
        <CreatePlantacaoForm/>
        </View>
    )
};

const styles = StyleSheet.create( {

});

export  default PlantacaoCreateScreen;
