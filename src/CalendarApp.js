import React from 'react'
import { Provider } from 'react-redux'
import { NotificationProvider } from './components/notification/NotificationProvider'


import { AppRouter } from './router/AppRouter'
import { store } from './store/store'


export const CalendarApp = () => {
    return (
        <div>
            <Provider store={ store } >
                <NotificationProvider />
                <AppRouter />
            </Provider>
        </div>
    )
}
