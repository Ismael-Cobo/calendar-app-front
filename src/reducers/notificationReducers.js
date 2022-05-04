import { types } from "../types/types";

const initialState = []

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.addNotification:
            return [
                ...state,
                {
                    ...action.payload    
                }
            ]
        
            case types.removeNotification:
                return state.filter( el => el.id !== action.payload.id)
    
        default:
            return state
    }
}