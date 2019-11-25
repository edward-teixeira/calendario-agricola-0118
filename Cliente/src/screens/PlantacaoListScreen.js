import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, Alert} from 'react-native';
import { Context as PlantacaoContext } from '../context/PlantacaoContext';
import { Card, List, Title, Paragraph, Button, IconButton, Icon, TouchableRipple, FAB, Portal } from 'react-native-paper';

const PlantacaoListScreen = ({ navigation }) => {

    const { state, DeletarPlantacao, ListarPlantacoes, EditarPlantacao } = useContext(PlantacaoContext);
    const [ Visible, setVisible ] = useState(true);

    useEffect(() => {
        setVisible(true);
        ListarPlantacoes();
        
        const listener = navigation.addListener('didFocus', () => {
            setVisible(true);
            ListarPlantacoes();
        });
        const fabListener = navigation.addListener('didBlur', () => {
            setVisible(false);
        })
        
        return () => {
            listener.remove();
        };
    }, []);

    
    return (
        <View>
           
        <ScrollView> 
        <FlatList
        showsHorizontalScrollIndicator={false}
        data={state}
        keyExtractor={ plantacao => plantacao._id }
        renderItem={({item}) => {
            return (
                <Card style={styles.container}
                    onPress={() =>{   
                        navigation.navigate('plantacaoDetail', {
                            id: item._id, 
                            colheita: item.colheita,
                            floracao: item.floraçao,
                            germinacao: item.germinacao,
                            nome: item.nome,
                            sistemaPlantio: item.sistemaPlantio,
                            tipoPlantio: item.tipoPlantio,
                            dataCriacao: item.createdAt
                        })
                    }}
                >
                <View style={styles.titleIconContainer}>
                <Title 
                style={styles.Title}
                >
                {item.nome}
                </Title>
                <IconButton
                onPress={() => {  navigation.navigate('plantacaoEditScreen', {id: item._id }) }}
                size={35}
                color={'#626262'}
                icon="pencil-circle-outline"
                />
                 <IconButton
                onPress={() => {  DeletarPlantacao(item._id) }}
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
             <Portal>
             <FAB
                 style={styles.fab}
                 icon="plus"
                 visible={Visible}
                 color='#626262'
                 theme={{ colors: { accent: '#00e676' } }}
                 onPress={() => {
                     
                     navigation.navigate('createPlantacao')
                 }}
             />
             </Portal>
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
            },
            fab: {
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 60,
                color: '#424242'
              }
            
        });
        
        export  default PlantacaoListScreen;
        