import { v4 } from "uuid"

import { fetchConToken } from "../components/helpers/fetch"
import { prepareEvents } from "../components/helpers/prepareEvents"
import { types } from "../types/types"
import { addNotification } from "./notification"



export const eventStartNew = ( event ) => {
    return async(dispatch, getState) => {

        const { uid, nameRes: name } = getState().auth
        console.log(getState().auth)

        try {
            const res = await fetchConToken('events', event, 'POST')
        
            const { ok, evento } = await res.json()
            if( ok ) {
                event._id = evento._id
                event.user = {
                    _id: uid,
                    name: name
                }
                
                dispatch( eventAddNew(event) )
                dispatch( addNotification(v4(), 'Evento agregado correctamente', types.success) )
            }
        } catch {
            dispatch( addNotification(v4(), 'Ha habido un error inesperado', types.error) )
        }

    }
}


const eventAddNew = (event) => {
    return {
        type: types.eventAddnew,
        payload: event
    }
}

export const eventSetAcive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const eventStartUpdate = ( evento ) => {
    return async(dispatch) => {
        console.log(evento)
        try {
            const res = await fetchConToken(`events/${evento._id}`, evento, 'PUT')
            const { ok, msg } = await res.json()
            
            if(!ok) {
                dispatch(addNotification(v4(), msg, types.error))
                return
            }
            dispatch(eventUpdated(evento))
            dispatch(addNotification(v4(), 'Evento actualizado', types.success))


        } catch (error) {
            console.log(error)
        }
    }
}

export const eventUpdated = (event) => {
    
    return {
        type: types.eventUpdated,
        payload: event
        
    }
}

export const eventStartdeleted = (event) => {
    return async(dispatch) => {
        try {
            const res = await fetchConToken(`events/${event._id}`, {}, 'DELETE')
            const { ok, msg } = await res.json()
            
            if(!ok) {
                dispatch(addNotification(v4(), msg, types.error))
                return
            }
            dispatch(eventDeleted(event))
            dispatch(addNotification(v4(), 'Evento eliminado', types.success))


        } catch (error) {
            console.log(error)
        }
    }
}

const eventDeleted = (event) => {
    
    return {
        type: types.eventDeleted,
        payload: event
        
    }
}

export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            const res = await fetchConToken('events')
            const { ok, eventos } = await res.json()
            
            const events = prepareEvents(eventos)
            //console.log(events)
            
            if(ok) {
            dispatch(eventLoader(events))
            }
        } catch {
            dispatch(addNotification(v4(), 'Ha habido un error inesperado al cargar todos los eventos del calendario', types.error))
        }
    }
}

export const eventLoader = ( events ) => {
    return {
        type: types.eventLoader,
        payload: events
    }
}

export const resetEventsOnLogOut = () => {
    return {
        type: types.eventsReset
    }
}

export const resetActiveEvent = () => {
    return {
        type: types.eventsResetActiveEvent
    }
}
