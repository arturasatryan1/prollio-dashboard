import {useState} from 'react'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import EventDialog from './components/EventDialog'
import {apiGetEventCalendar} from '@/services/CalendarService'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import useSWR from 'swr'
import {apiGetChannelListAll, apiUpdateChannel} from "@/services/ChannelService.js";
import {apiCreateEvent, apiDeleteEvent, apiUpdateEvent} from "@/services/EventService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import {useNavigate} from "react-router";

const Faq = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedCell, setSelectedCell] = useState({
        type: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()

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
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        }
    )

    const handleCellSelect = (event) => {

        const { start, end } = event

        const startDate = dayjs(start).toISOString()
        const endDate = dayjs(end).toISOString()

        navigate(`/events/create?start=${startDate}&end=${endDate}`)
    }

    const handleEventClick = (arg) => {
        const e = arg?.event || arg

        const {start, end, id, title, extendedProps} = e

        setSelectedCell({
            type: 'EDIT',
            // eventColor: extendedProps.eventColor,
            title,
            description: e.extendedProps?.description || e.description,
            price: e.extendedProps?.price || e.price,
            channel: e.extendedProps?.channel || e.channel,
            start: start ? dayjs(start).toISOString() : undefined,
            end: end ? dayjs(end).toISOString() : undefined,
            id,
        })

        navigate(`/events/${id}/edit`)
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

    const handleSubmit = async (data, type) => {
        setIsSubmitting(true)

        try {
            if (type === 'NEW') {
                await apiCreateEvent(data)

                toast.push(
                    <Notification type="success">Event created!</Notification>,
                    {placement: 'top-center'},
                )
            }
            if (type === 'EDIT') {
                await apiUpdateEvent(data.id, data)
                toast.push(
                    <Notification type="success">Event updated!</Notification>,
                    {placement: 'top-center'},
                )
            }

            mutate()
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors.message}</Notification>,
                {placement: 'top-center'},
            )
        }

        setIsSubmitting(false)
    }

    const handleArchive = async (id) => {
        setIsSubmitting(true)

        try {
            await apiDeleteEvent(id)

            toast.push(
                <Notification type="success">Event archived!</Notification>,
                {placement: 'top-center'},
            )

            mutate()

        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors.message}</Notification>,
                {placement: 'top-center'},
            )
        }

        setIsSubmitting(false)
        setDialogOpen(false)
    }

    return (
        <Container className="h-full">
            <CalendarView
                editable
                selectable
                events={events}
                eventClick={handleEventClick}
                select={handleCellSelect}
                eventDrop={handleEventChange}
            />
            <EventDialog
                channels={channels}
                open={dialogOpen}
                selected={selectedCell}
                submit={handleSubmit}
                handleArchive={handleArchive}
                onDialogOpen={setDialogOpen}
                isSubmitting={isSubmitting}
            />
        </Container>
    )
}

export default Faq
