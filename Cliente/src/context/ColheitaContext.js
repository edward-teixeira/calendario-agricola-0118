import createDataContext from "./createDataContext";
import calendarioApi from '../api/CalendarioAgro';
import { navigate } from "../navigationRef";

//Actions: create, delete, update, list
const colheitaReducer = ( state, action ) => {
    switch(action.type) {
        case 'get_colheita':
            return action.payload || {};
        case 'delete_colheita':
            return state.filter(colheita=> colheita._id !== action.payload);
        case 'edit_colheita':
            return state.map(colheita => {
                  return colheita.id === action.payload.id ? action.payload : colheita;
            });

        default:
            return state;
    }
};

// const CriarColheita = dispatch => async (nome, tipo, sistema,callback) => {
//     try {
//          await calendarioApi.post('/plantacao', {nome, tipo, sistema})
//          callback
//     }catch(e) {
//         console.log(e);
//     }

// };
const ListarColheita = dispatch => async () => {
    try {
        let colheitas = []
        const response = await calendarioApi.get('/colheita')
            .then(resposta => {
                resposta.data.map(item => colheitas.push(item));
            });
          console.log(colheitas);
        dispatch({type:'get_colheita', payload: colheitas});
    }catch(e) {
        console.log(e);
    }
};

const EditarColheita = dispatch => async (id, nome, tipo, sistema,callback) => {
    try {
        const novaPlantacao = await  calendarioApi.put(`/plantacao/${id}`, { nome, tipo, sistema });
        dispatch({type: 'edit_Colheita', payload: { id, nome, tipo, sistema }})
        callback();

    }catch(e) {
        console.log(e)
    }
};

const DeletarColheita = dispatch => async (itemID) => {
    try {
        const colheitaDeletada = await calendarioApi.delete(`/plantacao/${itemID}`);
        dispatch({type: 'delete_colheita', payload: itemID})
        ListarColheita;
    }catch(error) {
        console.log(error)
    }
};

export const { Context, Provider } = createDataContext(
    colheitaReducer,
    { ListarColheita },
    []
);
