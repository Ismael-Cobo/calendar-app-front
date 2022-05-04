import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { resetEventsOnLogOut } from '../../actions/events'

export const Navbar = () => {

    const dispatch = useDispatch()

    const { nameRes } = useSelector(state => state.auth)

    const handleLogOut = () => {
        dispatch(startLogout())
        dispatch(resetEventsOnLogOut())
    }

    return (
        <nav className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                { nameRes }
            </span>

            <button
                onClick={handleLogOut} 
                className='btn btn-outline-danger'
            >
                <span> <i className='fas fa-sign-out-alt' /> Salir</span>
            </button>
        </nav>
    )
}
