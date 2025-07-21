import {useState} from 'react'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import EventDialog from './components/EventDialog'
import {apiGetEventCalendar} from '@/services/CalendarService'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import useSWR from 'swr'
import {apiGetChannelListAll} from "@/services/ChannelService.js";
import {apiCreateEvent, apiCancelEvent, apiUpdateEvent} from "@/services/EventService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import {useNavigate} from "react-router";
import useTranslation from "@/utils/hooks/useTranslation.js";

const Calendar = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    // const [selectedCell, setSelectedCell] = useState({
    //     type: '',
    // })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()
    const {t} = useTranslation()

    const {data: events, mutate} = useSWR(
        '/api/event-calendar',
        () => apiGetEventCalendar(),
        {
            revalidateOnFocus: false
        }
    )

    const {data: channels} = useSWR(
        '/api/channels-list',
        () => apiGetChannelListAll(),
        {
            revalidateOnFocus: false,
            // revalidateIfStale: false,
            // revalidateOnReconnect: false,
        }
    )

    const handleCellSelect = (event) => {

        const {start, end} = event

        const startDate = dayjs(start).toISOString()
        const endDate = dayjs(end).toISOString()

        navigate(`/events/create?start=${startDate}&end=${endDate}`)
    }

    const handleEventClick = (arg) => {
        const e = arg?.event || arg

        const {id} = e

        navigate(`/events/${id}`)
    }

    const handleEventChange = (arg) => {
        const newEvents = cloneDeep(events)?.map((event) => {
            if (arg.event.id === event.id) {
                const {id, extendedProps, start, end, title} = arg.event
                event = {
                    id,
                    start: dayjs(start).format(),
                    end: dayjs(end).format(),
                    title,
                    description: extendedProps.description,
                    price: extendedProps.price,
                    channel: extendedProps.channel,
                    // eventColor: extendedProps.eventColor,
                }
            }
            return event
        })
        mutate(newEvents, false)
    }

    return (
        <Container className="h-full">
            <CalendarView
                // editable
                selectable
                events={events}
                eventClick={handleEventClick}
                select={handleCellSelect}
                eventDrop={handleEventChange}
            />
        </Container>
    )
}

export default Calendar
