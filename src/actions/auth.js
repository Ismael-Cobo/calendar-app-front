import { v4 } from "uuid"
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch"
import { types } from "../types/types"
import { addNotification } from "./notification"


export const startLogin = ( email, password ) => {
    return async(dispath) => {
        
        const res = await fetchSinToken('auth', { email, password }, 'POST')
        dispath(helperAction(res))
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispath ) => {
        const res = await fetchSinToken('auth/new', {name, email, password}, 'POST')
        dispath(helperAction(res))
    }
}

export const startChecking = () => {
    return async(dispath) => {
        const res = await fetchConToken('auth/renew')
        const { uid, name: nameRes, ok, token } = await res.json()
        if( ok ) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-initial-date', new Date().getTime())
            dispath( login({uid, nameRes}) )
        } else {
            dispath(checkingFinish())
        }
    }
}


const helperAction = ( res ) => {
    return async( dispath ) => {
        //const res = await fetchSinToken('auth/new', {name, email, password}, 'POST')
        const { uid, name: nameRes, ok, token, msg } = await res.json()
        
        if( ok ) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-initial-date', new Date().getTime())
            dispath( login({uid, nameRes}) )
            dispath( addNotification(v4(), 'Has entrado correctamente', types.success) )
        } else {
            dispath( addNotification(v4(), msg, types.error) )
        }
    }
}

const checkingFinish = () => {
    return {
        type: types.authCheckingFinish
    }
}

const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: user
    }
}

export const startLogout = () => {
    return ( dispath ) => {
        localStorage.clear()
        dispath(logout())
    }
}

const logout = () => {
    return {
        type: types.authLogout
    }
}