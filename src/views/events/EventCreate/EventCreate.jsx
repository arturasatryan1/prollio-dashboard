import {useState} from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import EventForm from '../EventForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {TbArrowNarrowLeft, TbTrash} from 'react-icons/tb'
import {useLocation, useNavigate} from 'react-router'
import {apiCreateEvent} from "@/services/EventService.js";
import useSWR from "swr";
import {apiGetChannelListAll} from "@/services/ChannelService.js";
import dayjs from "dayjs";
import Dialog from "@/components/ui/Dialog/index.jsx";
import StatusIcon from "@/components/ui/StatusIcon/StatusIcon.jsx";
import {FiCheck, FiCopy} from "react-icons/fi";
import {Input} from "@/components/ui/index.js";
import useTranslation from "@/utils/hooks/useTranslation.js";
import EventPreview from "@/views/events/EventForm/EventPreview.jsx";

const EventCreate = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {t} = useTranslation()

    const searchParams = new URLSearchParams(location.search)
    const start = searchParams.get('start')
    const end = searchParams.get('end')


    const {data: channels} = useSWR(
        '/api/channels-list',
        () => apiGetChannelListAll(),
        {
            revalidateOnFocus: false,
            // revalidateIfStale: false,
            // revalidateOnReconnect: false,
        }
    )

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [previewConfirmationOpen, setPreviewConfirmationOpen] = useState(false)
    const [eventInfoDialogOpen, setEventInfoDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [event, setEvent] = useState(false)
    const [copied, setCopied] = useState(false)
    const [submitValues, setSubmitValues] = useState({})

    const handleCopy = () => {
        navigator.clipboard.writeText(event.link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleFormSubmit = async () => {
        setPreviewConfirmationOpen(false)

        const values = submitValues;

        setIsSubmitting(true)

        values.start = dayjs(values.start).format()
        values.end = dayjs(values.end).format()

        try {
            const res = await apiCreateEvent(values);

            if (res) {
                setEvent(res)
                setEventInfoDialogOpen(true)
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger" width={400}>{t(errors?.response?.data?.message)}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        navigate('/events')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handlePreview = (values) => {
        setPreviewConfirmationOpen(true)
        setSubmitValues(values)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
        setSubmitValues({})
    }

    const handleCloseEventInfoDialog = () => {
        setEventInfoDialogOpen(false)
        navigate('/events')
    }

    return (
        <>
            <EventForm
                defaultValues={{
                    start: start ? dayjs(start).toDate() : dayjs().toDate(),
                    end: end ? dayjs(end).toDate() : dayjs().add(1, 'hour').toDate(),
                }}
                channels={channels}
                onFormSubmit={handlePreview}
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
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash/>}
                                onClick={handleDiscard}
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmitting}
                            >
                                {t('Create')}
                            </Button>
                        </div>
                    </div>
                </Container>
            </EventForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title={t('Cancel')}
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
                cancelText={t('Close')}
                confirmText={t('Cancel')}
            >
                <p>
                    {t('Are you sure you want to cancel?')}
                </p>
            </ConfirmDialog>

            <ConfirmDialog
                isOpen={previewConfirmationOpen}
                type="info"
                statusIcon={false}
                title={t('Event Preview')}
                onClose={() => setPreviewConfirmationOpen(false)}
                onRequestClose={() => setPreviewConfirmationOpen(false)}
                onCancel={() => setPreviewConfirmationOpen(false)}
                onConfirm={handleFormSubmit}
            >
                <EventPreview
                    event={submitValues}
                    channels={channels}
                />
            </ConfirmDialog>

            <Dialog
                isOpen={eventInfoDialogOpen}
                contentClassName="pb-0 px-0"
                onClose={handleCloseEventInfoDialog}
                onRequestClose={handleCloseEventInfoDialog}
                onCancel={handleCloseEventInfoDialog}
            >

                <div className="px-6 pb-6 pt-2 flex">
                    <div>
                        <StatusIcon type={'success'}/>
                    </div>
                    <div className="ml-4 rtl:mr-4">
                        <h5 className="mb-2">{t('Created Successful')}</h5>
                        {t('Share this link with your members so they can join the event.')}
                    </div>
                </div>
                <div className="px-6 pb-6 pt-2 space-y-3 text-sm">
                    <div>
                        <strong>{t('Share Link')}</strong>
                        <div className="mt-1 flex items-center gap-2">
                            <Input
                                readOnly
                                value={event.link}
                                className=""
                            />
                            <Button size="sm" onClick={handleCopy}>
                                {copied ? <FiCheck size={16}/> : <FiCopy size={16}/>}
                            </Button>
                        </div>
                        {copied && (
                            <span className="text-green-600 text-xs mt-1 inline-block">
                              {t('Copied to clipboard')}
                            </span>
                        )}
                    </div>
                </div>

                <div className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-2xl rounded-br-2xl">
                    <div className="flex justify-end items-center gap-2">
                        <Button
                            size="sm"
                            variant="solid"
                            onClick={handleCloseEventInfoDialog}
                        >
                            {t('Close')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default EventCreate
