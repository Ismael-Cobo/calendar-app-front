import React, { useEffect, useState } from 'react'

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../actions/notification';
import { v4 } from 'uuid';
import { types } from '../../types/types';
import { eventStartNew, eventStartUpdate, resetActiveEvent } from '../../actions/events';
import { CloseModal } from '../../actions/ui';

const startDate = moment().minute(0).second(0).add(1, 'hours')

const initForm = {
    title: '',
    notes: '',
    start: startDate.toDate(),
    end: startDate.add(1, 'hour').toDate()
}

export const ModalContent = () => {

    const dispatch = useDispatch()

    const { activeEvent } = useSelector(state => state.calendar)

    const [isDateValid, setIsDateValid] = useState(true)

    const [isTitleValid, setIsTitleValid] = useState(true)

    const [formValues, setFormValues] = useState(initForm)

    const { title, notes, start, end } = formValues

    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent)
        }
    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = ( e ) => {
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = ( e ) => {
        setFormValues({
            ...formValues,
            end: e
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if( momentStart.isSameOrAfter(momentEnd) ){
            setIsDateValid(false)
            dispatch( addNotification(v4(), 'La fecha fin debe de ser mayor a la fecha de inicio', types.error) )
            return
        }
        setIsDateValid(true)

        if( title.trim().length < 2 ) {
            setIsTitleValid(false)
            dispatch( addNotification(v4(), 'El titulo debe de ser del al menos 2 caracteres', types.error) )
            return
        }        
        setIsTitleValid(true)

        if( activeEvent ) {
            dispatch(eventStartUpdate(formValues))
            //console.log(formValues)
            //dispatch( addNotification(v4(), 'Evento actualizado correctamente', types.success) )
        }else {
            dispatch(eventStartNew(formValues))
        }

        
        dispatch( CloseModal() )
        dispatch(resetActiveEvent())

        
    }

    return (
        <div>
            <h1> { activeEvent ? 'Editar evento' : 'Nuevo evento'}  </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmit }
                noValidate   
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={start}
                        className={`form-control ${!isDateValid && 'invalid'}`}
                        format="y-MM-dd h:mm a"
                        amPmAriaLabel="Select AM/PM"  
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={end}
                        className='form-control'
                        format="y-MM-dd h:mm a"
                        amPmAriaLabel="Select AM/PM"
                        minDate={start}
                        
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!isTitleValid && 'invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className='form-control'
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </div>
    )
}
