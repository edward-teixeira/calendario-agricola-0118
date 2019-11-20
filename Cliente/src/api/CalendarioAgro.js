import axios from 'axios';
import { AsyncStorage } from 'react-native';


const instance = axios.create({
    baseURL: 'http://bf85bf72.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if( token ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    )
export default instance;
    