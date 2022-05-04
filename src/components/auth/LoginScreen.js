import React from 'react'

import { Login } from './Login'


import './login.css'
import { Register } from './Register'

export const LoginScreen = () => {

    return (
        <div className="container login-container">
            <div className="row" style={{margin: '9% 0'}}>
                <Login />
                <Register />
            </div>
        </div>
    )
}
