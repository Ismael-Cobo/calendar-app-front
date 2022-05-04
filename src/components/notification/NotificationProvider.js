import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'

import '../../styles/styles.css'

export const NotificationProvider = () => {

    const notifications = useSelector(state => state.notification)

    return (
        <div>
            <div className={'notification-wrapper'}>
                {
                    notifications.map(note => {
                        return <Notification key= { note.id } {...note} />
                    })
                }
            </div>
        </div>
    )
}