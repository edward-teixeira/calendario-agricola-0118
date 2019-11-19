import createDataContext from "./createDataContext";
import calendarioApi from '../api/CalendarioAgro';
import { navigate } from "../navigationRef";

//Actions: create, delete, update, list
const plantacaoReducer = ( state, action ) => {
    switch(action.type) {
        case 'get_plantacoes':
            return action.payload;
        case 'delete_plantacao':
            return state.filter(plantacao => plantacao._id !== action.payload);
        case 'edit_plantacao':
            return state.map(plantacao => {
                  return plantacao.id === action.payload.id ? action.payload : plantacao;
            });

        default:
            return state;
    }
};

const CriarPlantacao = dispatch => async (nome, tipo, sistema,callback) => {
    try {
         await calendarioApi.post('/plantacao', {nome, tipo, sistema})
         callback
    }catch(e) {
        console.log(e);
    }

};
const ListarPlantacoes = dispatch => async () => {
    try {
        
        const plantacoes = await calendarioApi.get('/plantacao');
        dispatch({type: 'get_plantacoes', payload: plantacoes.data})

    }catch(e) {
        console.log(e);
    }
};
const EditarPlantacao = dispatch => async (id, nome, tipo, sistema,callback) => {
    try {
        const novaPlantacao = await  calendarioApi.put(`/plantacao/${id}`, { nome, tipo, sistema });
        dispatch({type: 'edit_plantacao', payload: { id, nome, tipo, sistema }})
        callback();

    }catch(e) {
        console.log(e)
    }
};

const DeletarPlantacao = dispatch => async (itemID) => {
    try {
        const plantacaoDeletada = await calendarioApi.delete(`/plantacao/${itemID}`);
        dispatch({type: 'delete_plantacao', payload: itemID})
        ListarPlantacoes;
    }catch(error) {
        console.log(error)
    }
};

export const { Context, Provider } = createDataContext(
    plantacaoReducer,
    { CriarPlantacao, DeletarPlantacao, EditarPlantacao, ListarPlantacoes },
    []
);
