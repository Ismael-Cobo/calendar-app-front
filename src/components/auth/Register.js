import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 } from 'uuid'
import validator from 'validator'
import { startRegister } from '../../actions/auth'

import { addNotification } from '../../actions/notification'
import { useForm } from '../../hooks/useForm'
import { types } from '../../types/types'

export const Register = () => {

    const dispatch = useDispatch()

    const [ formValues, handleInputChanges ] 
    = useForm({
        Name: 'Ismael',
        Email: 'ismael2@gmail.com',
        Password1: '123456',
        Password2: '123456'
    })

    const {
        Name,
        Email,
        Password1,
        Password2
    } = formValues

    const [isNameValid, setisNameValid] = useState(true)
    const [isEmailValid, setisEmailValid] = useState(true)
    const [isPassword1Valid, setisPassword1Valid] = useState(true)
    const [isPassword2Valid, setisPassword2Valid] = useState(true)


    const handleSubmit = (e) => {
        e.preventDefault()

        if( isFormValid() ){
            dispatch(startRegister(Email, Password1, Name))
        }

    }

    const isFormValid = () => {

        if (Name.trim() === ''){
            dispatch(addNotification(v4(), 'El nombre es obligatoria', types.error))
            setisNameValid(false)
            return false
        }
        setisNameValid(true)
        if (!validator.isEmail(Email)) {
            dispatch(addNotification(v4(), 'El correo electrónico del registro no es valido', types.error))
            setisEmailValid(false)           
            return false
        } 
        setisEmailValid(true)
        if (Password1.trim().length <= 5){
            dispatch(addNotification(v4(), 'La contraseña del registro debe de tener al menos 6 caracteres', types.error))
            setisPassword1Valid(false)
            return false
        }
        if (Password1.trim() !== Password2.trim()) {
            dispatch(addNotification(v4(), 'La contraseñas de registro deben de ser iguales', types.error))
            setisPassword1Valid(false)
            return false
        }
        setisPassword1Valid(true)
        if (Password2.trim().length <= 5){
            dispatch(addNotification(v4(), 'La segunda contraseña del registro debe de tener al menos 6 caracteres', types.error))
            setisPassword2Valid(false)
            return false
        }
        setisPassword2Valid(true)
        
        return true;
    }

    return (
        <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form 
                onSubmit={ handleSubmit }
                noValidate
            >
                <div className="form-group">
                    <input
                        type="text"
                        className={`form-control ${!isNameValid ? 'invalid' : '' } `}
                        placeholder="Nombre"
                        name='Name'
                        value={ Name }
                        onChange= { handleInputChanges }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className={`form-control ${!isEmailValid ? 'invalid' : '' } `}
                        placeholder="Correo"
                        name='Email'
                        value={ Email }
                        onChange= { handleInputChanges }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className={`form-control ${!isPassword1Valid ? 'invalid' : '' } `}
                        placeholder="Contraseña"
                        name='Password1'
                        value={ Password1 }
                        onChange= { handleInputChanges }
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className={`form-control ${!isPassword2Valid ? 'invalid' : '' } `}
                        placeholder="Repita la contras"
                        name="Password2"
                        value={ Password2 }
                        onChange= { handleInputChanges }
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        className="btnSubmit"
                        value="Crear cuenta" />
                </div>
            </form>
        </div>
    )
}
