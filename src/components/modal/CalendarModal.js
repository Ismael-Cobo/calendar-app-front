import React from 'react'
import Modal from 'react-modal';

import './calendarModal.css'

import { customStyles } from '../helpers/customStyles'
import { useDispatch, useSelector } from 'react-redux';

import { ModalContent } from './ModalContent';
import { CloseModal } from '../../actions/ui'
import { resetActiveEvent } from '../../actions/events';

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const dispatch = useDispatch()

    const { modalOpen } = useSelector(state => state.ui)

    const closeModal = () => {
        dispatch(CloseModal())
        dispatch(resetActiveEvent())
    }

    return (
        
            <Modal
                isOpen={modalOpen}
                //onAfterOpen={afterOpenModal}
                closeTimeoutMS={200}
                onRequestClose={closeModal}
                style={customStyles}
                className='modal'
                overlayClassName='modal-fondo'
            >
                <ModalContent />
            </Modal>
    )
}
