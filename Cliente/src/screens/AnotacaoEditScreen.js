import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Context as AnotacaoContext} from '../context/AnotacaoContext';
import { Button, 
    TextInput, 
    RadioButton, 
    Paragraph, Subheading, 
    Title,
    Card,
    Colors,
    Surface
} from 'react-native-paper';


const EditAnotacaoScreen = ({ navigation }) => {    
    const id = navigation.getParam('id')
    const plantacaoId= navigation.getParam('plantacaoId')
    const [ Titulo, setTitulo ] = useState('');
    const [ Descricao, setDescricao ] = useState('');
    const { state, EditarAnotacao } = useContext(AnotacaoContext);

    const anotacao = state.find(anotacao => anotacao._id === id ); 

    return (
        <ScrollView
        
        >
        <View >
            <Card 
                style={styles.cardStyle}>
       
                <TextInput
                    placeholder="Titulo"
                    value={Titulo}
                    type="flat"
                    theme={{colors: {background: '#FFF59D', primary: '#00e676'}}}
                    onChangeText={(Titulo) => setTitulo(Titulo)}
                />
                <TextInput
                    placeholder="Descricao"
                    value={Descricao}
                    type="flat"
                    theme={{colors: {background: '#FFF59D',primary: '#00e676'}}}
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(Descricao) => setDescricao(Descricao)}
                />
                 <Button
                     mode="contained"
                     color='#ffd600'
                     onPress={() => {
                        EditarAnotacao(id, plantacaoId, Titulo, Descricao, () => navigation.pop());
                        }}
                    >Editar</Button>
               </Card>
        </View>
        </ScrollView>
    )
};
() => navigation.pop()
const styles = StyleSheet.create( {
    cardStyle: {
        backgroundColor: '#FFF59D',
        width: 300,
        margin: 20,
        alignSelf: 'center'
    }

});

export  default EditAnotacaoScreen;
