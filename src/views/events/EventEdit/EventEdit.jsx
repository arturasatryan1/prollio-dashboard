import React, {useState} from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import EventForm from '../EventForm'
import NoUserFound from '@/assets/svg/NoUserFound'
import {TbArrowNarrowLeft, TbCheck, TbTrash} from 'react-icons/tb'
import {useNavigate, useParams} from 'react-router'
import useSWR from 'swr'
import {apiGetEvent, apiUpdateEvent} from "@/services/EventService.js";
import dayjs from "dayjs";
import {apiGetChannelListAll} from "@/services/ChannelService.js";
import {MdClose} from "react-icons/md";
import useTranslation from "@/utils/hooks/useTranslation.js";

const EventEdit = () => {
    const {id} = useParams()

    const navigate = useNavigate()
    const {t} = useTranslation()

    const {data, isLoading} = useSWR(
        [`/api/events/${id}`, {id: id}],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetEvent(params),
        {
            revalidateOnFocus: false,
        },
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

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFormSubmit = async (values) => {

        setIsSubmitting(true)

        values.start = dayjs(values.start).format()
        values.end = dayjs(values.end).format()

        try {
            await apiUpdateEvent(id, values);

            toast.push(
                <Notification type="success">{t('Event updated successfully.')}</Notification>,
                {placement: 'top-center'},
            )

            navigate('/events')
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors.message}</Notification>,
                {placement: 'top-center'},
            )
        }

        setIsSubmitting(false)
    }

    const getDefaultValues = () => {
        if (data) {
            const {
                title,
                description,
                channel_id,
                price,
                start_time,
                end_time,
                promo_codes = [],
            } = data

            return {
                title,
                description,
                channel: channel_id,
                price,
                start: start_time ? dayjs(start_time).toDate() : null,
                end: end_time ? dayjs(end_time).toDate() : null,
                promoCodes: promo_codes.map((code) => ({
                    code: code.code,
                    discountType: code.type,
                    discountValue: code.value.toString(),
                    maxUsage: code.usage_limit?.toString() || '',
                })),
            }
        }

        return {}
    }

    return (
        <>
            {(!isLoading && !data) || data?.status !== 'upcoming' && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280}/>
                    <h3 className="mt-8">{t('No event found!')}</h3>
                </div>
            )}
            {!isLoading && data && data?.status === 'upcoming' && (
                <>
                    <EventForm
                        pageTitle={'Edit Event'}
                        defaultValues={getDefaultValues()}
                        onFormSubmit={handleFormSubmit}
                        channels={channels}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft/>}
                                    onClick={() => history.back()}
                                >
                                    {t('Back')}
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmitting}
                                    >
                                        {t('Save')}
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </EventForm>
                </>
            )}
        </>
    )
}

export default EventEdit
