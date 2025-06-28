import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {TbCalendarEvent} from "react-icons/tb";
import {apiGetEventUpcoming} from "@/services/EventService.js";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useNavigate} from "react-router";

const {Tr, Td, TBody, THead, Th} = Table

const UpcomingEvents = () => {

    const [events, setEvents] = useState([])
    const {t} = useTranslation();
    const navigate = useNavigate()


    const fetchUpcomingEvents = async () => {
        try {
            const data = await apiGetEventUpcoming()
            setEvents(data)
        } catch (err) {
            console.error('Failed to fetch channels', err)
        }
    }

    useEffect(() => {
        if (events.length === 0) {
            fetchUpcomingEvents().then(res => {
            })
        }
    }, [])

    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>{t('Upcoming Events')}</h4>
                <Button
                    variant="solid"
                    type="button"
                    size="sm"
                    onClick={() => navigate('/events/create')}
                >
                    {t('Create New')}
                </Button>
            </div>
            <div className="mt-6">
                <Table hoverable={false}>
                    <TBody>
                        {events.map((row) => {
                            return (
                                <Tr key={row.title}>
                                    <Td className="px-0!">
                                        <div className="flex gap-2">
                                            <TbCalendarEvent size={22}/>
                                            <div>
                                                <p className={`heading-text`}>{row.title}</p>
                                                <p> {dayjs(row.start_time).format('DD MMM YYYY hh:mm')}</p>
                                            </div>
                                        </div>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default UpcomingEvents
