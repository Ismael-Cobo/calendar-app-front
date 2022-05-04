import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../helpers/calendar-messages-es'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from '../modal/CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../actions/ui'
import { eventSetAcive, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'


moment.locale('es')

const localizer = momentLocalizer(moment)




export const CalendarScreen = () => {

    const dispatch = useDispatch()

    

    const { events:myeventList, activeEvent } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    console.log()

    useEffect(() => {
        
        dispatch(eventStartLoading())
    }, [dispatch])

    const onDoubleClick = (event) => {
        dispatch(openModal())
        
    }

    const onSelected = (event) => {
        dispatch(eventSetAcive(event))
    }

    const onViewChange = (event) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }


    const eventStyleGetter = () => {
        const style = {
            backgroundColor: '#367CF7',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return{
            style
        }
    }


    return (
        <div>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={myeventList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={onSelected}
                onView={onViewChange}
                view={lastView}
                
            />

            <CalendarModal />
            {
                
            }
            <AddNewFab />
            {
                activeEvent &&
                <DeleteEventFab />
            }
            
        </div>
    )
}