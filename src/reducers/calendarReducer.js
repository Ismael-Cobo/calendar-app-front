 import { types } from "../types/types";

/*

    {
        id: v4() ,
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        notes: 'comprar papel',
        user: {
            _id: '1234',
            name: 'Ismael'
        }
    }

*/

const initialState = {
    events:
    [],
    activeEvent: null
}

export const calendarReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case types.eventAddnew: 
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload,
                ]
            }
        case types.eventSetActive: 
            return {
                ...state,
                activeEvent: action.payload 
            }
        case types.eventUpdated: 
            return {
                ...state,
                events: state.events.map(event => (event._id === action.payload._id) ? action.payload : event) //evento es igual a
            }
        
        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(e => e._id !== state.activeEvent._id),
                activeEvent: null
            }

        case types.eventLoader:
            return {
                ...state,
                events: [ ...action.payload ]
            }
        
        case types.eventsReset: 
            return {
                ...initialState
            }
        
        case types.eventsResetActiveEvent: 
            return {
                ...state,
                activeEvent: null
            }
        
        default:
            return {
                ...state
            }
    }
}