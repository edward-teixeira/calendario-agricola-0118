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
import CreateAnotacaoScreen from "./src/screens/CreateAnotacaoScreen";
import CreatePlantacaoScreen from "./src/components/CreatePlantacaoForm";
import  { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator} from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as PlantacaoProvider } from './src/context/PlantacaoContext';
import { Provider as PaperProvider } from 'react-native-paper';


const switchNavigator = createSwitchNavigator({
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
            Plantacao: PlantacaoCreateScreen,
            anotacaoCreate: CreateAnotacaoScreen
        }),
        Colheita: ColheitaScreen,
        Account: AccountScreen
    })
}, {

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




