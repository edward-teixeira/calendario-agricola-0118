import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Title, Card, Avatar, Paragraph} from 'react-native-paper';
import { VictoryPie, VictoryContainer} from "victory-native";
import { ScrollView } from 'react-native-gesture-handler';
import { differenceInDays,  formatISO, toDate, addDays, parse } from 'date-fns';


const PlantacaoDetailScreen = ({ navigation }) => {
    const  nome  = navigation.getParam('nome');
    const  germinacao  = navigation.getParam('germinacao');
    const  floracao  = navigation.getParam('floracao');
    const  colheita  = navigation.getParam('colheita');
    const dataInicio = navigation.getParam('dataCriacao');
    const plantacaoId = navigation.getParam('id');
    const dateNow = toDate(Date.now());
    const dataDaColheita = addDays(new Date(dataInicio), parseInt(germinacao + floracao + colheita));
    const diasParaColheita = (differenceInDays(dateNow, dataDaColheita) * -1);

    const ajustarTextoDias = (dC) => (dC < 2 ? "dia" : "dias");
    const ajustarTextoFaltam = (dC) => (dC < 2 ? "Falta" : "Faltam");
    

    return (
        <ScrollView    
        >
        <View>
        <Card style={styles.cardStyle}>
        <Title style={styles.title}>{nome}</Title>
        <Paragraph
            style={styles.P}
        > {ajustarTextoFaltam(diasParaColheita)} <Text style={styles.DiasParaColheita}>{ diasParaColheita }</Text> {ajustarTextoDias(diasParaColheita)} para a colheita!</Paragraph>
        <VictoryPie 
            style={{
                data: {
                fillOpacity: 0.9, stroke: "#fafafa", strokeWidth: 2
                }}}
            style={{ labels: { fill: "#626262", fontSize: 15, fontWeight: 'bold'}}}
            width={400} 
            height={300}
            innerRadius={50}
            colorScale={["#00E676", "#3e2723", "#448aff"]}
            data={[
                { x:`Colheita`,y:colheita },
                { x: "Germinacao",y:germinacao },
                { x: "Floracao",y:floracao }
            ]}
        />
        </Card>
        
        <Card style={styles.anotacaoCard}
            onPress={() => navigation.navigate('anotacaoList', { id: plantacaoId })}
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
            marginTop: 20,
            alignItems: 'center',
        },
        title: {
            fontSize: 28,
            textAlign: 'center',
            color: '#626262',
            padding: 10
        },
        anotacaoCard: {
            backgroundColor: '#FFF59D',
            margin: 20,
            height: 120
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
        },
        P: {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#626262'
        },
        DiasParaColheita: { 
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ff1744',
            textDecorationLine: "underline",
        }
    });
    
    export  default PlantacaoDetailScreen;
    