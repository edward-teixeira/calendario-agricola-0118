import React, {useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text,  Input } from 'react-native-elements';
import { Context as PlantacaoContext } from '../context/PlantacaoContext';
import { Button, 
    TextInput, 
    RadioButton, 
    Paragraph, Subheading, 
    Title
} from 'react-native-paper';

const EditPlantacaoScreen = ({ navigation }) => {
    
    const id = navigation.getParam('id');
    const { state, EditarPlantacao } = useContext(PlantacaoContext);
    const plantacao = state.find(plantacao => plantacao._id === id ); 

    const [ nome, setNome ] = useState(plantacao.nome);
    const [ sistemaChecked, setSistemaChecked ] = useState(plantacao.sistemaPlantio);
    const [ tipoChecked, setTipoChecked ] = useState(plantacao.tipoPlantio);
    
    return (
        <View style={styles.Container}>
        <Card style={styles.CardShadow}>
        <Title style={styles.cardFont}>Caracteristicas</Title>
        <TextInput
        type="outlined"
        value={nome}
        placeholder="Nome"
        style={styles.CardContainer}
        onChangeText={(nome) => setNome(nome)} 
        />
        <Subheading>Tipo:</Subheading>
        <View style={styles.CardContainer}>
        <Paragraph>Muda</Paragraph>
        <RadioButton
        value="muda"
        onPress={() => setTipoChecked('muda')}
        status={tipoChecked === 'muda' ? 'checked': 'unchecked'}
        
        />
        <Paragraph>Semente</Paragraph>
        <RadioButton
        value="semente"
        status= {tipoChecked === 'semente' ? 'checked': 'unchecked'}
        onPress={() => {
            setTipoChecked('semente')}}
            />
            </View>
            <Subheading>Sistema de Plantio:</Subheading>
            <View style={styles.CardContainer}>
            <Paragraph>Hidroponia</Paragraph>
            <RadioButton
            value="hidroponia"
            status={ sistemaChecked === 'hidroponia' ? 'checked': 'unchecked' }
            onPress = {  () => {
                setSistemaChecked('hidroponia')
            }
        }
        />
        <Paragraph>Terra</Paragraph>
        <RadioButton
        status={sistemaChecked === 'terra'? 'checked': 'unchecked'}
        value="terra"
        onPress={() => {
            setSistemaChecked('terra');
        }}
        />
        </View>
        <Button
        mode="contained"
        onPress={() => { EditarPlantacao(id, nome, tipoChecked, sistemaChecked, () => navigation.pop())}}
        >Editar</Button>
        </Card>
        </View>
        );
    }
    
    const styles = StyleSheet.create({
        Container: {
            backgroundColor: '#00e676',
            height: 800,
        },
        CardContainer: {
            flexDirection: 'row',
            margin: 10
        },
        cardFont: {
            fontSize: 18,
            marginBottom: 10
        },
        errorMessage: {
            fontSize: 16,
            color: 'red',
            marginLeft: 15,
            marginTop: 15,
            fontWeight: 'bold',
            alignSelf: 'center'
        }
    })
    
    export default EditPlantacaoScreen;
    
    