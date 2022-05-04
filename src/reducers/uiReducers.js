import { types } from "../types/types";

const initialState = {
    modalOpen: false
}


export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.openModal:
            return{
                ...state,
                modalOpen: true
            }
        case types.closeModal:
            return{
                ...state,
                modalOpen: false
            }
    
        default:
            return state
    }
}