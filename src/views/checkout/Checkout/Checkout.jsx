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
import {submitCheckout} from "@/services/CheckoutService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";


const validationSchema = z
    .object({
        email: z.string().optional(),
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

            if (result) {
                window.location.href = result.url;
            }
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
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
                                        {`Welcome! You're about to join the event `}
                                    </p>
                                    <p>
                                        {`Secure your spot by completing the payment below.`}
                                    </p>
                                </h4>

                                <address className="not-italic">
                                    <div className="mb-3">
                                        <h6>Event Title</h6>
                                        <p>{event?.title}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h6>Description</h6>
                                        <p>{event?.description}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h6>Duration</h6>
                                        <p>{dayjs(event?.start_time).format('DD MMM YYYY hh:mm')} - {dayjs(event?.end_time).format('DD MMM YYYY hh:mm')}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h6>Price</h6>
                                        <p>
                                            <NumericFormat
                                                displayType="text"
                                                value={event?.price}
                                                prefix={'֏'}
                                                thousandSeparator={true}
                                            />
                                        </p>
                                    </div>
                                </address>
                                <Form onSubmit={handleSubmit(submit)}>
                                    <input type="hidden" {...register('member_id')} />
                                    <input type="hidden" {...register('event_id')} />

                                    <FormItem
                                        label="Email"
                                        size={100}
                                    >
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({field}) => (
                                                <Input
                                                    type="email"
                                                    placeholder="Your Email (optional)"
                                                    autoComplete="off"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Promo Code"
                                        size={100}

                                    >
                                        <Controller
                                            name="promo"
                                            control={control}
                                            render={({field}) => (
                                                <Input
                                                    type="text"
                                                    placeholder="Promo Code (optional)"
                                                    autoComplete="off"
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </FormItem>
                                    <FormItem
                                        invalid={Boolean(errors.agree)}
                                        errorMessage={errors.agree?.message}
                                    >
                                        <Controller
                                            name="agree"
                                            control={control}
                                            render={({field}) => (
                                                <Checkbox
                                                    {...field}
                                                >
                                                    I agree to the {''}
                                                    <Link to={`/terms`} className={'underline'}>
                                                        Terms of Use
                                                    </Link>
                                                    {', '}
                                                    <Link to={`/terms`} className={'underline'}>
                                                        Privacy Policy
                                                    </Link>
                                                    {' '}
                                                    and
                                                    {' '}
                                                    <Link to={`/terms`} className={'underline'}>
                                                        Refund Policy
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
                                        {isSubmitting ? 'Redirecting...' : 'Submit'}
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
