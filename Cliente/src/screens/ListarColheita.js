import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, Alert, Image} from 'react-native';
import { Context as ColheitaContext } from '../context/ColheitaContext';
import { Card, List, Title, Paragraph, Button, IconButton, Icon, TouchableRipple, FAB, Portal } from 'react-native-paper';
import calendarioApi from '../api/CalendarioAgro';

const ColheitaListScreen = ({ navigation }) => {


    const { state, ListarColheita} = useContext(ColheitaContext);
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
        <View>
        <ScrollView> 
        <FlatList
        showsHorizontalScrollIndicator={false}
        data={state.map(item => item)}
        keyExtractor={ (filtered) => filtered._id }
        renderItem={({item}) => {
            return (
                <Card style={styles.container}
                    onPress={() =>{   
                        navigation.navigate('colheitaDetail', {
                            item: item})
                    }}
                >
                <View style={styles.titleIconContainer}>
                <Title 
                style={styles.Title}
                >
                {item.nome}
                </Title>
                <IconButton
                onPress={() => {  }}
                size={35}
                color={'#626262'}
                icon="pencil-circle-outline"
                />
                 <IconButton
                onPress={() => {  DeletarColheita(item._id) }}
                size={35}
                color={'#ff1744'}
                icon="delete-circle-outline"
                />
                </View>
                
                {/* <Card.Content  style={styles.cardContent}>
                
                <View style={styles.iconContainer}>
                <Paragraph style={{margin: 5, fontWeight: 'bold'}}></Paragraph>
                <IconButton
                style={{alignSelf: 'center'}}
                size={20}
                color='#FDD835'
                icon='star'
                />
                </View>
                
                <View style={styles.iconContainer}>
                <Paragraph style={{margin: 5, fontWeight: 'bold'}}></Paragraph>
                <IconButton
                style={{alignSelf: 'center'}}
                size={20}
                color={item.sistemaPlancolheitaDetailtio === 'hidroponia' ? '#0091ea': 'black'}
                icon={item.sistemaPlantio === 'hidroponia' ? 'waves': 'terrain'}
                />
                </View>
                
                
                <View style={styles.iconContainer}>
                <Paragraph style={{margin: 5, fontWeight: 'bold'}}></Paragraph>
                <IconButton
                style={{alignSelf: 'center'}}
                size={20}
                icon={item.tipoPlantio === 'muda'? 'barley' : require('../../assets/coffee-beans-1.png')}
                />
                </View>
                </Card.Content> */}
                </Card>
                )
            }}
            />
            </ScrollView>
            </View>
            )
        };
        //{item.sistemaPlantio.toUpperCase()}
        //{item.tipoPlantio.toUpperCase()}
        const styles = StyleSheet.create( {

            AppBar: {
                backgroundColor: '#00e676',
                height: 65,
                fontSize: 30, 
                fontWeight: 'bold', 
                letterSpacing: 2, 
                color: '#626262',
                marginTop: 20
            },
            IconBar: {
                width: 50,
                height: 50,
                marginLeft: 90,
                alignSelf: 'center'
            },



            container: {
                margin: 30,
                borderColor: '#00e676',
                borderWidth: 0.6,
                shadowColor: '#424242',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 10,
                shadowOpacity: 1.0,
                elevation: 5
            },
            cardContent: {
                flexDirection: 'row',
                alignContent: "space-between",
                width: 300,
                alignSelf: 'center',
            },
            iconCard: {
                borderWidth: 1,
                flexDirection: 'row',
            },
            Title: {
                textAlign: 'center',
                color: '#626262',
                fontSize: 30,
                flex: 1,
                marginTop: 20,
                marginBottom: 10
            },
            titleIconContainer: {
                display: 'flex',
                flexDirection: 'row'
            },
            iconContainer: {
                margin: 10
            },
            fab: {
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 60,
                color: '#424242'
              }
            
        });
        
        export  default ColheitaListScreen;
        