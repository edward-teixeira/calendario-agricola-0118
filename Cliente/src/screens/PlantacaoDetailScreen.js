import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Title, Card, Avatar } from 'react-native-paper';
import { VictoryPie, VictoryContainer } from "victory-native";
import { ScrollView } from 'react-native-gesture-handler';

const PlantacaoDetailScreen = ({ navigation }) => {
    const  nome  = navigation.getParam('nome');
    const  germinacao  = navigation.getParam('germinacao');
    const  floracao  = navigation.getParam('floracao');
    const  colheita  = navigation.getParam('colheita');

    return (
        <ScrollView
            
        >
        <View>
        <Card>
        <Title style={styles.title}>{nome}</Title>
        <VictoryPie
            style={{
                data: {
                fillOpacity: 0.9, stroke: "#626262", strokeWidth: 2
                }}}
            width={500} 
            height={300}
            innerRadius={50}
            colorScale={["#00E676", "#B9F6CA", "#B9F6CA"]}
            data={[
                { x: "Colheita", y: colheita },
                { x: "Germinacao", y:  germinacao },
                { x: "Floracao", y: floracao }
            ]}
        />
        </Card>
        
        <Card style={styles.anotacaoCard}
        >
        <Title style={styles.anotacaoTitle}>O que aconteceu hoje? Escreva aqui</Title>
        <Avatar.Image 
        style={styles.avatarImage}
        size={45}
        source={require('../assets/notepad-1.png')}
        />
        </Card>
        </View>
        </ScrollView>
        )
    };
    
    const styles = StyleSheet.create( {
        cardStyle: {
            margin: 30,
            alignItems: 'center'
        },
        title: {
            fontSize: 28,
            textAlign: 'center',
            color: '#626262',
            padding: 20
        },
        anotacaoCard: {
            backgroundColor: '#FFF59D',
            margin: 20,
            height: 100
        },
        anotacaoTitle: {
            fontSize: 16,
            color: '#626262',
            textAlign: 'center'
        },
        avatarImage: {
            margin: 20,
            marginBottom: 20,
            alignSelf: 'center'
        },
        chartContainer: {
            borderColor: 'red',
            borderWidth: 2
        }
    });
    
    export  default PlantacaoDetailScreen;
    