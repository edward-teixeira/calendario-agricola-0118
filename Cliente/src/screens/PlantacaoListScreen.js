import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, Alert} from 'react-native';
import PlantacaoListCard  from '../components/PlantacaoListCard';
import { Context as PlantacaoContext } from '../context/PlantacaoContext';
import { Card, List, Title, Paragraph, Button, IconButton, Icon, TouchableRipple } from 'react-native-paper';



const PlantacaoListScreen = ({ navigation }) => {
    
    const { state, DeletarPlantacao, ListarPlantacoes, EditarPlantacao } = useContext(PlantacaoContext);
    
    useEffect(() => {
        ListarPlantacoes();
        
        const listener = navigation.addListener('didFocus', () => {
            ListarPlantacoes();
        });
        
        return () => {
            listener.remove();
        };
    }, []);

    const showAlert = (messageTitle, messageBody) => {
        Alert.alert(messageTitle, messageBody, [
            {
                text: 'Ok',
                onPress: () => {}
            }
        ])
    }
    
    return (
        <View>
        <ScrollView> 
        <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('createPlantacao')}
        >
        Criar Plantacao
        </Button>
        <FlatList
        showsHorizontalScrollIndicator={false}
        data={state}
        keyExtractor={ plantacao => plantacao._id }
        renderItem={({item}) => {
            return (
                <Card style={styles.container}>
                <View style={styles.titleIconContainer}>
                <Title 
                style={styles.Title}
                >
                {item.nome}
                </Title>
                <IconButton
                onPress={() => navigation.navigate('plantacaoEditScreen', {id: item._id })}
                size={35}
                color={'#626262'}
                icon="pencil-circle-outline"
                />
                 <IconButton
                onPress={() => DeletarPlantacao(item._id) }
                size={35}
                color={'#ff1744'}
                icon="delete-circle-outline"
                />
                </View>
                
                <Card.Content  style={styles.cardContent}>
                
                <View style={styles.iconContainer}>
                <Paragraph style={{margin: 5, fontWeight: 'bold'}}>{new Date(item.createdAt).toLocaleDateString("pt-BR")}</Paragraph>
                <IconButton
                style={{alignSelf: 'center'}}
                size={20}
                icon='calendar'
                />
                </View>
                <View style={styles.iconContainer}>
                <Paragraph style={{margin: 5, fontWeight: 'bold'}}>{item.sistemaPlantio.toUpperCase()}</Paragraph>
                <IconButton
                style={{alignSelf: 'center'}}
                size={20}
                color={item.sistemaPlantio === 'hidroponia' ? '#0091ea': 'black'}
                icon={item.sistemaPlantio === 'hidroponia' ? 'waves': 'terrain'}
                />
                </View>
                
                
                <View style={styles.iconContainer}>
                <Paragraph style={{margin: 5, fontWeight: 'bold'}}>{item.tipoPlantio.toUpperCase()}</Paragraph>
                <IconButton
                style={{alignSelf: 'center'}}
                size={20}
                icon={item.tipoPlantio === 'muda'? 'barley' : require('../../assets/coffee-beans-1.png')}
                />
                </View>
                </Card.Content>
                </Card>
                )
            }}
            />
            
            </ScrollView>
            </View>
            )
        };
        
        const styles = StyleSheet.create( {
            
            container: {
                margin: 15,
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
            }
            
        });
        
        export  default PlantacaoListScreen;
        