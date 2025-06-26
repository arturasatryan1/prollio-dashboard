import {useState} from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import EventForm from '../EventForm'
import NoUserFound from '@/assets/svg/NoUserFound'
import {TbArrowNarrowLeft, TbTrash} from 'react-icons/tb'
import {useNavigate, useParams} from 'react-router'
import useSWR from 'swr'
import {apiGetEvent, apiUpdateEvent} from "@/services/EventService.js";
import dayjs from "dayjs";
import {apiGetChannelListAll} from "@/services/ChannelService.js";
import {MdClose} from "react-icons/md";

const EventEdit = () => {
    const {id} = useParams()

    const navigate = useNavigate()

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
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        }
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFormSubmit = async (values) => {

        setIsSubmitting(true)

        values.start = dayjs(values.start).format()
        values.end = dayjs(values.end).format()

        try {
            await apiUpdateEvent(id, values);

            toast.push(
                <Notification type="success">Event saved!</Notification>,
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
                    discountType: code.discount_type,
                    discountValue: code.discount_value.toString(),
                    maxUsage: code.usage_limit?.toString() || '',
                })),
            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Event canceled!</Notification>,
            {placement: 'top-center'},
        )
        navigate('/events')
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280}/>
                    <h3 className="mt-8">No event found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <EventForm
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
                                    Back
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<MdClose/>}
                                        onClick={handleDelete}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </EventForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Cancel event"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to cancel this event? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default EventEdit
