import createDataContext from "./createDataContext";
import calendarioApi from '../api/CalendarioAgro';
import { navigate } from "../navigationRef";

//Actions: create, delete, update, list
const anotacaoReducer = ( state, action ) => {
    switch(action.type) {
        case 'get_anotacoes':
            return action.payload || {};
        case 'delete_anotacao':
            return state.filter(anotacao => anotacao._id !== action.payload);
        case 'edit_anotacao':
            return state.map(anotacao => {
                  return anotacao.id === action.payload.id ? action.payload : anotacao;
            });

        default:
            return state;
    }
};

const CriarAnotacao = dispatch => async (plantacaoId, Titulo, Descricao, callback) => {
    try {
         await calendarioApi.post(`/plantacao/${plantacaoId}/anotacao/`, { Titulo, Descricao })
         callback
    }catch(e) {
        console.log(e);
    }

};

const ListarAnotacao = dispatch => async (plantacaoId) => {
    try {
        let anotacoesArray = [];
        let anotacoes = [];
        const response = await calendarioApi.get(`/plantacao/${plantacaoId}/anotacao/`)
            .then(function (response) {
                if(response) {
                    anotacoesArray = response.data.anotacoes
                }
            });
            anotacoesArray.forEach( anotacao => {
                anotacoes.push(anotacao);
            })
       dispatch({type: 'get_anotacoes', payload: anotacoes || {}});

    }catch(e) {
        console.log(e);
    }
};
 const EditarAnotacao = dispatch => async (plantacaoId, id, titulo,descricao,callback) => {
     try {
             const novaPlantacao = await  calendarioApi.put(`/plantacao/${plantacaoId}/anotacao/${id}`, { titulo, descricao });
             console.log(novaPlantacao);
             dispatch({type: 'edit_anotacao', payload: { id, titulo, descricao }})
             callback();

         }catch(e) {
             console.log(e)
         }
     };

 const DeletarAnotacao = dispatch => async (anotacaoId, plantacaoId) => {
     try {
         console.log(anotacaoId);
         const plantacaoDeletada = await calendarioApi.delete(`/plantacao/${plantacaoId}/anotacao/${anotacaoId}`);
         dispatch({type: 'delete_anotacao', payload: anotacaoId})
         ListarPlantacoes;
     }catch(error) {
         console.log(error)
     }
 };

export const { Context, Provider } = createDataContext(
    anotacaoReducer,
    { CriarAnotacao, ListarAnotacao, EditarAnotacao, DeletarAnotacao },
    []
);
