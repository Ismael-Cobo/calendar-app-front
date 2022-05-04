import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../actions/ui'

export const AddNewFab = () => {

    const dispatch = useDispatch()
    const { activeEvent } = useSelector(state => state.calendar)

    const handleOpenModal = () => {
        dispatch(openModal())
    }

    return (
        <button 
            className='btn btn-primary fab'
            onClick={ handleOpenModal }
        >
            <i className={ activeEvent ? 'fas fa-edit' : 'fas fa-plus'} />
        </button>
    )
}
