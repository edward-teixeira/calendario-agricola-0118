import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, Alert, Image} from 'react-native';
import { Context as ColheitaContext } from '../context/ColheitaContext';
import {Card, List, Title, Paragraph, Button, IconButton, Icon, TouchableRipple, FAB, Portal, Avatar } from 'react-native-paper';
import calendarioApi from '../api/CalendarioAgro';

const ColheitaDetailScreen = ({ navigation }) => {

    const { state, ListarColheita} = useContext(ColheitaContext);

    const item= navigation.getParam('item');
    console.log(" Item =>>>>" + item);


    state.map(item => console.log(item));
    useEffect(() => {    
        ListarColheita();    
        const listener = navigation.addListener('didFocus', () => {
        ListarColheita();
        });
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <ScrollView>
            <View>
                <Card >
                <Title>{item.nome}</Title>

                <Text>Avaliacao <Icon source='star-border'/>
                <Text>Avaliacao <Icon source='star-border'/>
                    
                </Text>
                </Card>

                <Card>
                    <Title>Caracteristicas</Title>
                    <Avatar.Image 
                        source={require('../assets/balanca1.png')}
                        size={55}
                        style={{backgroundColor: '#fafafa'}}
                        />
                         <Avatar.Image
                            source={require('../assets/tamanho.png')}
                            size={55}
                            style={{backgroundColor: '#fafafa'}}
                        />
                </Card>

                <Card>
                    <Title>Medidas</Title>
                    <Avatar.Image
                         source={require('../assets/nose1.png')}
                         size={55}
                         style={{backgroundColor: '#fafafa'}}
                        />
                         <Avatar.Image
                            source={require('../assets/mass1.png')}
                            size={55}
                            style={{backgroundColor: '#fafafa'}}
                        />
                        <Avatar.Image
                            source={require('../assets/taste1.png')}
                            size={55}
                            style={{backgroundColor: '#fafafa'}}
                        />
                         <Avatar.Image
                            source={require('../assets/lotus1.png')}
                            size={55}
                            style={{backgroundColor: '#fafafa'}}
                        />
                </Card>


            </View>
        <Text>Colheita Detail Screen</Text>
        </ScrollView>
    );

}


const styles = StyleSheet.create({});

export default ColheitaDetailScreen;