import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import { Card, List, Title, Paragraph, Button, IconButton, Icon, TouchableRipple, FAB, Portal, Subheading } from 'react-native-paper';
import { Context as AnotacaoContext} from '../context/AnotacaoContext';

const ListAnotacaoScreen = ({ navigation }) => {

    const plantacaoId = navigation.getParam('id');
    const { state, CriarAnotacao, ListarAnotacao, DeletarAnotacao } = useContext(AnotacaoContext);
    const [ Visible, setVisible ] = useState(true);


    useEffect(() => {
        
        const listener = navigation.addListener('didFocus', () => {
            setVisible(true);
            ListarAnotacao(plantacaoId);
        });
         const fabListener = navigation.addListener('willBlur', () => {
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
                keyExtractor={ (filtered) => filtered._id}
                renderItem={({item}) => {
                    return (
                        <Card style={styles.cardStyle}>
                            <View style={styles.Container}>
                                <Title style={styles.Title}>Data: {new Date(item.createdAt).toLocaleDateString("pt-BR")}</Title>
                                <IconButton
                                    style={styles.IconButton}
                                    onPress={() => {  navigation.navigate('anotacaoEdit', {id: item._id, plantacaoId: plantacaoId}) }}
                                    size={35}
                                    color={'#626262'}
                                    icon="pencil-circle-outline"
                                />
                                 <IconButton
                                    style={styles.IconButton}
                                    onPress={() => { DeletarAnotacao(item._id,plantacaoId)}}
                                    size={35}
                                    color={'#ff1744'}
                                    icon="delete-circle-outline"                                />
                             </View>
                             <View style={styles.TextContainer}>
                                <Subheading style={styles.Subtitulos}>
                                    Titulo: 
                                     <Text style={styles.Texto}>{item.titulo}</Text>
                                </Subheading>
                                <Subheading style={styles.Subtitulos}>Descrição:</Subheading>
                                <Text style={styles.Texto}>{item.descricao}</Text>
                            </View>
                        </Card>
                    )
        }}
            >
            </FlatList>
            <Portal>
             <FAB
                 style={styles.fab}
                 icon="plus"
                 visible={Visible}
                 color='#626262'
                 theme={{ colors: { accent: '#FFF59D' } }}
                 onPress={() =>  navigation.navigate('anotacaoCreate', {id: navigation.getParam('id')})}
             />
             </Portal>
        </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create( {

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 60,
        color: '#424242'
      },
      Container: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#fafafa',
        borderWidth: 2,
        
      },
      cardStyle: {
        backgroundColor: '#FFF59D',
        width: 300,
        margin: 20,
        alignSelf: 'center',
        height: 300,
        margin: 15,
                borderColor: '#FFF59D',
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
      Title: {
          marginTop: 15,
          marginRight: 10,
          color: '#BDBDBD'
      },
      Subtitulos: {
        color: '#424242',
      },
      Texto: {
        color: '#BDBDBD',
        fontSize: 16,
        marginLeft: 10,
      },
      TextContainer: {
          margin: 5
      },
});

export  default ListAnotacaoScreen;
