import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator }  from 'react-navigation-stack';
import ColheitaScreen from "./src/screens/ColheitaScreen";
import AccountScreen from "./src/screens/AccountScreen";
import PlantacaoCreateScreen from "./src/screens/PlantacaoCreateScreen";
import PlantacaoDetailScreen from "./src/screens/PlantacaoDetailScreen";
import PlantacaoListScreen from "./src/screens/PlantacaoListScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import EditPlantacaoScreen from './src/screens/EditPlantacaoScreen';
import CreateAnotacaoScreen from "./src/screens/CreateAnotacaoScreen";
import CreatePlantacaoScreen from "./src/components/CreatePlantacaoForm";
import  { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator} from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as PlantacaoProvider } from './src/context/PlantacaoContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppBar } from './src/components/AppBar';
import { Text, View, Image } from 'react-native-elements';




const switchNavigator = createSwitchNavigator( 
    {
        ResolveAuth: ResolveAuthScreen,
        loginFlow: createStackNavigator({
            SignUp: SignUpScreen,
            SignIn: SignInScreen,
        }),
        mainFlow: createBottomTabNavigator({
            plantacaoListFlow: createStackNavigator({
                plantacaoList: PlantacaoListScreen,
                createPlantacao: CreatePlantacaoScreen,
                plantacaoDetail: PlantacaoDetailScreen,
                plantacaoEditScreen: EditPlantacaoScreen,
                anotacaoCreate: CreateAnotacaoScreen
            }, {
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
            }),
            Colheita: ColheitaScreen,
            Account: AccountScreen
        }
        )
    });
    
    const App=createAppContainer(switchNavigator);
    
    
    export default () => {
        return (
            <PlantacaoProvider>
            <AuthProvider>
            <PaperProvider>
            <App
            ref={ (navigate)=> setNavigator(navigate) }
            />
            </PaperProvider>
            </AuthProvider>
            </PlantacaoProvider>
            )
        };
        
        
        
        
        