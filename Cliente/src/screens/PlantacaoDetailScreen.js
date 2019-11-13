import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const PlantacaoDetailScreen = ({ navigation }) => {
    return (
        <>
        <Text style={{ fontSize: 48}}>PlantacaoDetailScreen</Text>
            <Button
                title="Go create anotacao"
                onPress={ () => navigation.navigate('anotacaoCreate') }
            />
        </>
    )
};

const styles = StyleSheet.create( {

});

export  default PlantacaoDetailScreen;
