import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import InfoSection from './InfoSection.jsx'
import PromoCodesSection from "./PromoCodesSection.jsx";

// import ActivitySection from './ActivitySection'
import useSWR from 'swr'
import {useNavigate, useParams} from 'react-router'
import isEmpty from 'lodash/isEmpty'
import {apiCancelEvent, apiGetEvent} from "@/services/EventService.js";
import useTranslation from "@/utils/hooks/useTranslation.js";
import Dialog from "@/components/ui/Dialog/index.jsx";
import {Form} from "@/components/ui/index.js";
import {FormItem} from "@/components/ui/Form/index.jsx";
import {Controller, useForm} from "react-hook-form";
import Input from "@/components/ui/Input/index.jsx";
import Button from "@/components/ui/Button/index.jsx";
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import {MdArrowBack} from "react-icons/md";

const {TabNav, TabList, TabContent} = Tabs

const validationSchema = z
    .object({
        reason: z.string({required_error: ''}),
    })

const EventDetails = () => {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isCanceling, setIsCanceling] = useState(false)

    const {id} = useParams()
    const {t} = useTranslation()
    const navigate = useNavigate()

    const {
        reset,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues: {
            paymentMethod: null,
            agree: false,
        },
        resolver: zodResolver(validationSchema),
    })

    const {data, isLoading} = useSWR(
        ['/api/events', {id: id}],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetEvent(params),
        {
            revalidateOnFocus: false,
            // revalidateIfStale: false,
            // revalidateOnReconnect: false,
        },
    )

    const handleCancel = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleSubmitCancel = async (values) => {
        try {
            const res = await apiCancelEvent(id, values)

            if (res) {
                reset()
                setDeleteConfirmationOpen(false)

                toast.push(
                    <Notification type="success">{t('Event Canceled')}</Notification>,
                    {placement: 'top-center'},
                )

                navigate('/events')
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setIsCanceling(false)
        }
    }

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <>
                    <div className="mb-4">
                        <Button
                            variant="plain"
                            size="sm"
                            onClick={() => navigate(-1)}
                            icon={<MdArrowBack />}
                            iconAlignment="start"
                        >
                            {t('Back')}
                        </Button>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div className="min-w-[330px] 2xl:min-w-[400px]">
                            <InfoSection
                                data={data}
                                handleCancel={handleCancel}
                            />
                        </div>
                        <Card className="w-full">
                            <Tabs defaultValue="promos">
                                <TabList>
                                    <TabNav value="promos">{t('Promo Codes')}</TabNav>
                                    {/* <TabNav value="activity">{t('Activity')}</TabNav> */}
                                </TabList>
                                <div className="p-4">
                                    <TabContent value="promos">
                                        <PromoCodesSection data={data.promo_codes ?? []}/>
                                    </TabContent>
                                    {/* <TabContent value="activity">
                                        <ActivitySection
                                            customerName={data.title}
                                            id={id}
                                        />
                                    </TabContent> */}
                                </div>
                            </Tabs>
                        </Card>

                        <Dialog
                            isOpen={deleteConfirmationOpen}
                            closable={!isCanceling}
                            onClose={() => setDeleteConfirmationOpen(false)}
                            onRequestClose={() => setDeleteConfirmationOpen(false)}
                        >
                            <Form onSubmit={handleSubmit(handleSubmitCancel)}>
                                <h5>{t('Are you sure you want to cancel this event?')}</h5>
                                <div className={'mt-5'}>
                                    <FormItem
                                        label={t('Cancellation Reason (will be sent to paid members)')}
                                        invalid={Boolean(errors.reason)}
                                        errorMessage={t(errors.reason?.message)}
                                    >
                                        <Controller
                                            name="reason"
                                            control={control}
                                            render={({field}) => {
                                                return (
                                                    <Input
                                                        textArea
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder={t('Please provide a reason for canceling the event')}
                                                        {...field}
                                                    />
                                                )
                                            }}
                                        />
                                    </FormItem>
                                </div>
                                <div className="mt-6">
                                    <Button
                                        block
                                        variant="solid"
                                        loading={isCanceling}
                                    >
                                        {t("Cancel")}
                                    </Button>
                                </div>
                            </Form>
                        </Dialog>
                    </div>
                </>
            )}
        </Loading>
    )
}

export default EventDetails
