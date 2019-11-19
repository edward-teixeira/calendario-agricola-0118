import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import CreatePlantacaoForm from "../components/CreatePlantacaoForm";
import { Context as PlantacaoContext } from '../context/PlantacaoContext';

const PlantacaoCreateScreen = ({ navigation }) => {

    
    
    const helloFunction = function(nome, tipo, sistema) {
        console.log(`${nome}\n${tipo}\n${sistema}`);
    }

    return (
        <View>
        <CreatePlantacaoForm/>
        </View>
    )
};


export  default PlantacaoCreateScreen;
