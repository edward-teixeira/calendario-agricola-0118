import createDataContext from "./createDataContext";

//Actions: Create, delete, update, list
const plantacaoReducer = ( state, action ) => {
    switch(action.type) {
        default:
            return state;
    }
};

const CriarPlantacao = dispatch => () => {};
const EditarPlantacao = dispatch => () => {};
const DeletarPlantacao = dispatch => () => {};


export const { Context, Provider } = createDataContext(
    plantacaoReducer,
    { CriarPlantacao, DeletarPlantacao, EditarPlantacao },
    []
);
