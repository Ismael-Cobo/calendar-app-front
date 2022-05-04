import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 } from 'uuid'
import validator  from 'validator'

import { startLogin } from '../../actions/auth'
import { addNotification } from '../../actions/notification'


import { useForm } from '../../hooks/useForm'
import { types } from '../../types/types'

export const Login = () => {

    const dispatch = useDispatch()

    const [ formValues, handleInputChanges ] 
    = useForm({
        Email: 'ismael@gmail.com',
        Password: '123456'
    })

    const { Email, Password } = formValues

    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const handleLoginSubmit = (e) => {
        
        e.preventDefault()

        if( isFormValid() ){
            dispatch(startLogin(Email, Password))
        }

    }

    const isFormValid = () => {
        
        if (!validator.isEmail(Email)) {
            dispatch(addNotification(v4(), 'Invalid login email', types.error))
            setIsEmailValid(false)           
            return false
        } 
        setIsEmailValid(true)
        if (Password.trim().length <= 5){
            dispatch(addNotification(v4(), 'Login password should be at leat 6 characters', types.error))
            setIsPasswordValid(false)
            return false
        }
        setIsPasswordValid(true)
        
        
        return true;
    }


    return (
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLoginSubmit }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className={`form-control ${!isEmailValid ? 'invalid' : '' } `}
                                placeholder="Correo"
                                name="Email"
                                value= { Email }
                                onChange={ handleInputChanges }
                                
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={`form-control ${ !isPasswordValid ? 'invalid' : '' } `}
                                placeholder="Contraseña"
                                name="Password"
                                value={ Password }
                                onChange={ handleInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
    )
}
