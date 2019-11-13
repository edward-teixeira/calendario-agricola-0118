import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const PlantacaoListScreen = ({ navigation }) => {
    return (
        <View>
        <Text style={{ fontSize: 48}}>PlantacaoListScreen</Text>
            <Button
                icon="camera"
                mode="contained"
                onPress={() => navigation.navigate('createPlantacao')}
            >
                Criar Plantacao
            </Button>
        </View>
    )
};

const styles = StyleSheet.create( {

});

export  default PlantacaoListScreen;
