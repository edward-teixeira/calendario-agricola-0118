import * as React from 'react';
import { createAppContainer, createSwitchNavigator, BottomTabBar  } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator }  from 'react-navigation-stack';
import ColheitaScreen from "./src/screens/ColheitaScreen";
import AccountScreen from "./src/screens/AccountScreen";
import PlantacaoCreateScreen from "./src/screens/PlantacaoCreateScreen";
import PlantacaoDetailScreen from "./src/screens/PlantacaoDetailScreen";
import PlantacaoListScreen from "./src/screens/PlantacaoListScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AnotacaoListScreen from './src/screens/AnotacaoListScreen';
import EditPlantacaoScreen from './src/screens/EditPlantacaoScreen';
import CreateAnotacaoScreen from "./src/screens/CreateAnotacaoScreen";
import CreatePlantacaoScreen from "./src/components/CreatePlantacaoForm";
import  { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as AnotacaoProvider } from './src/context/AnotacaoContext';
import { setNavigator} from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as PlantacaoProvider } from './src/context/PlantacaoContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text, View, Image } from 'react-native-elements';
import AnotacaoEditScreen from './src/screens/AnotacaoEditScreen'
import ColheitaListScreen from './src/screens/ListarColheita';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as ColheitaProvider } from './src/context/ColheitaContext';
import ColheitaDetailScreen  from './src/screens/ColheitaDetail';



const switchNavigator = createSwitchNavigator( 
    {
        ResolveAuth: ResolveAuthScreen,
        loginFlow: createStackNavigator({
            SignUp: SignUpScreen,
            SignIn: SignInScreen,
        }),
        mainFlow: createBottomTabNavigator({
            Plantacoes: { screen: createStackNavigator({
                plantacaoList: PlantacaoListScreen,
                createPlantacao: CreatePlantacaoScreen,
                plantacaoDetail: PlantacaoDetailScreen,
                plantacaoEditScreen: EditPlantacaoScreen,
                anotacaoCreate: CreateAnotacaoScreen,
                anotacaoList: AnotacaoListScreen,
                anotacaoEdit: AnotacaoEditScreen,                
            },{
                defaultNavigationOptions: {
                    headerTitle: () => 
                    <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: 2, color: '#626262', alignSelf: 'center',
                    marginLeft:  110}}
                    >Growth</Text>
                    ,
                    headerStyle: {
                        backgroundColor: '#00e676',
                        headerTintColor: '#626262'
                    },
                    headerLeft: null,
                    headerRight: () => <Image 
                    source={require('./src/assets/Vector.png')}
                    style={{ width: 50, height: 50, marginLeft: 90 }}
                    />
                },
                
            }), navigationOptions: {
                    tabBarIcon: ({ tintColor }) => {
                        return <MaterialCommunityIcons name="home" size={35} color="#626262" />;
                    }
            }},
            Colheita: { screen: createStackNavigator({
                colheitaListScreen: ColheitaListScreen,
                colheitaDetail: ColheitaDetailScreen ,
                
            }, 
            {
                defaultNavigationOptions: {
                    headerTitle: () => 
                    <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: 2, color: '#626262', alignSelf: 'center',
                    marginLeft:  110}}
                    >Growth</Text>
                    ,
                    headerStyle: {
                        backgroundColor: '#00e676',
                        headerTintColor: '#626262'
                    },
                    headerLeft: null,
                    headerRight: () => <Image 
                    source={require('./src/assets/Vector.png')}
                    style={{ width: 50, height: 50, marginLeft: 90 }}
                    />
                },
                
            }
            
            ), navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    return <MaterialCommunityIcons name="flower" size={35} color="#626262" />;
                }
            }},
            Account: {
                screen: AccountScreen,
                navigationOptions: {
                    tabBarIcon: ({ tintColor }) => {
                        return <MaterialIcons name="person" size={35} color="#626262" />;
                    }
                }
            },
        },
        {
            tabBarOptions: {
                activeTintColor: '#fafafa',
                labelStyle: {
                    fontSize: 14,
                },
                style: {
                    backgroundColor: '#00E676',
                },
                activeBackgroundColor: '#00C853',
                showLabel: false,
                showIcon: true
            }
            
        })
    });

    
    const App=createAppContainer(switchNavigator);
    
    
    export default () => {
        return (
            <ColheitaProvider>
            <AnotacaoProvider>
            <PlantacaoProvider>
            <AuthProvider>
            <PaperProvider>
            <App
            ref={ (navigate)=> setNavigator(navigate) }
            />
            </PaperProvider>
            </AuthProvider>
            </PlantacaoProvider>
            </AnotacaoProvider>
            </ColheitaProvider>
            )
        };
        
        
        
        
        