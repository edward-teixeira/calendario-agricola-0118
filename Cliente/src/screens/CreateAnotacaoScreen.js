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


const CreateAnotacaoScreen = ({ navigation }) => {    
    const plantacaoId = navigation.getParam('id')
    const [ Titulo, setTitulo ] = useState('');
    const [ Descricao, setDescricao ] = useState('');
    const { CriarAnotacao } = useContext(AnotacaoContext);

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
                        CriarAnotacao(plantacaoId,Titulo, Descricao, navigation.navigate('anotacaoList'));
                        }}
                    >Criar</Button>
               </Card>
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create( {
    cardStyle: {
        backgroundColor: '#FFF59D',
        width: 300,
        margin: 20,
        alignSelf: 'center'
    }

});

export  default CreateAnotacaoScreen;
