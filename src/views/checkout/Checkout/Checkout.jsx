import LanguageSelector from "@/components/template/LanguageSelector.jsx";
import Header from "@/components/template/Header.jsx";
import classNames from "@/utils/classNames.js";
import Logo from "@/components/template/Logo.jsx";
import {Form, FormItem} from "@/components/ui/Form/index.jsx";
import {Controller, useForm} from "react-hook-form";
import Input from "@/components/ui/Input/index.jsx";
import Button from "@/components/ui/Button/index.jsx";
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Card, Checkbox} from "@/components/ui/index.js";
import useSWR from "swr";
import {apiGetEvent} from "@/services/EventService.js";
import {apiGetCustomer} from "@/services/CustomerService.js";
import Loading from "@/components/shared/Loading.jsx";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import {Link} from "react-router";
import {apiCheckPaymentStatus, apiHandlePaymentSuccess, submitCheckout} from "@/services/CheckoutService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";


const validationSchema = z
    .object({
        email: z.string(),
        promo: z.string().optional(),
        member_id: z.string().optional(),
        event_id: z.string().optional(),
        agree: z.literal(true, {
            errorMap: () => ({
                message: 'You must agree to the terms before continuing.',
            }),
        }),
    })

const Checkout = (props) => {
    const searchParams = new URLSearchParams(location.search)
    const [isSubmitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)
    const [paymentErrorMessage, setPaymentErrorMessage] = useState('')

    const {t} = useTranslation()

    const memberId = searchParams.get('mid');
    const eventId = searchParams.get('eid');

    const {data: event, isLoading: isEventLoading} = useSWR(
        [`/api/events`, {id: eventId}],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetEvent(params),
        {
            revalidateOnFocus: false,
        },
    )

    const {data: member, isLoading: isCustomerLoading} = useSWR(
        [`/api/events/`, {id: memberId}],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetCustomer(params),
        {
            revalidateOnFocus: false,
        },
    )

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues: {
            member_id: memberId || '',
            event_id: eventId || '',
            agree: false,
        },
        resolver: zodResolver(validationSchema),
    })

    const submit = async (values) => {
        setSubmitting(true)

        try {
            const result = await submitCheckout(values)

            if (result && !result?.error && result.formUrl) {
                const popup = window.open(
                    result.formUrl,
                    'paymentWindow',
                    'width=500,height=600'
                );

                const popupCheckInterval = setInterval(() => {
                    if (!popup || popup.closed) {
                        clearInterval(popupCheckInterval);
                        clearInterval(checkPaymentStatusInterval);
                        setSubmitting(false);
                    }
                }, 500);

                const checkPaymentStatusInterval = setInterval(async () => {
                    const payment = await apiCheckPaymentStatus({
                        orderId: result.orderId,
                        action: 'payment',
                    })

                    if (!payment) {
                        clearInterval(checkPaymentStatusInterval);
                        clearInterval(popupCheckInterval);
                        popup.close();
                        setSubmitting(false);
                    } else if (payment.status === 'completed') {
                        clearInterval(checkPaymentStatusInterval);
                        clearInterval(popupCheckInterval);
                        popup.close();

                        const handlePaymentSuccessResult = await apiHandlePaymentSuccess({
                            uuid: payment.uuid
                        })

                        if (handlePaymentSuccessResult && handlePaymentSuccessResult.redirect) {
                            window.location.href = handlePaymentSuccessResult.redirect;
                        }

                    } else if (payment.status === 'failed') {
                        clearInterval(checkPaymentStatusInterval);
                        clearInterval(popupCheckInterval);
                        popup.close();
                        setSubmitting(false);
                        setPaymentFailed(true)
                        setPaymentErrorMessage(payment.description)
                    }
                }, 2000);
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">
                    {t(errors?.response?.data?.message) || errors.toString()}
                </Notification>,
                {placement: 'top-center'},
            )

            setSubmitting(false)
        }
    }

    return (
        <div>
            <Header
                className="shadow-sm dark:shadow-2xl"
                headerStart={
                    <Logo
                        imgClass="max-h-8"
                    />
                }
                headerEnd={<LanguageSelector/>}
            />
            <main>
                <div
                    className={classNames(
                        'page-container relative h-full flex-auto  px-4 sm:px-6 py-6 sm:py-8 md:px-8 container mx-auto lg:w-2/4 flex justify-center',
                    )}
                >
                    <Loading loading={isEventLoading || isCustomerLoading}>
                        {event && (
                            <Card className={``}>
                                <h4 className="mb-4 font-bold">
                                    <p>
                                        {t(`Welcome! You're about to join the event`)}
                                    </p>
                                    <p>
                                        {t(`Secure your spot by completing the payment below.`)}
                                    </p>
                                </h4>

                                <address className="not-italic">
                                    <div className="mb-3">
                                        <h6>{t('Event Title')}</h6>
                                        <p>{event?.title}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h6>{t('Description')}</h6>
                                        <p>{event?.description}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h6>{t('Duration')}</h6>
                                        <p>{dayjs(event?.start_time).format('DD MMM YYYY hh:mm')} - {dayjs(event?.end_time).format('DD MMM YYYY hh:mm')}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h6>{t('Price')}</h6>
                                        <p>
                                            <NumericFormat
                                                displayType="text"
                                                value={event?.price}
                                                suffix={'֏'}
                                                thousandSeparator={true}
                                            />
                                        </p>
                                    </div>
                                </address>
                                <Form onSubmit={handleSubmit(submit)}>
                                    <input type="hidden" {...register('member_id')} />
                                    <input type="hidden" {...register('event_id')} />

                                    <FormItem
                                        label={t('Email')}
                                        size={100}
                                        invalid={Boolean(errors.email)}
                                        // errorMessage={t(errors.email?.message)}
                                    >
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({field}) => (
                                                <Input
                                                    type="email"
                                                    placeholder={`${t('Email')}`}
                                                    autoComplete="off"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={t('Promo Code')}
                                        size={100}

                                    >
                                        <Controller
                                            name="promo"
                                            control={control}
                                            render={({field}) => (
                                                <Input
                                                    type="text"
                                                    placeholder={`${t('Promo Code')}  (${t('optional')})`}
                                                    autoComplete="off"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        invalid={Boolean(errors.agree)}
                                        errorMessage={t(errors.agree?.message)}
                                    >
                                        <Controller
                                            name="agree"
                                            control={control}
                                            render={({field}) => (
                                                <Checkbox
                                                    {...field}
                                                >
                                                    {t('I agree to the')} {''}
                                                    <Link to={`/terms`} className={'underline'}>
                                                        {t('Terms of Use')}
                                                    </Link>
                                                    {', '}
                                                    <Link to={`/terms`} className={'underline'}>
                                                        {t('Privacy Policy')}
                                                    </Link>
                                                    {' '}
                                                    {t('and')}
                                                    {' '}
                                                    <Link to={`/terms`} className={'underline'}>
                                                        {t('Refund Policy')}
                                                    </Link>
                                                </Checkbox>
                                            )}
                                        />
                                    </FormItem>
                                    <Button
                                        block
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {t(isSubmitting ? 'Redirecting...' : 'Submit')}
                                    </Button>
                                </Form>
                            </Card>
                        )}
                    </Loading>
                </div>
            </main>
            {/*<Footer/>*/}
        </div>

    )
}

export default Checkout
