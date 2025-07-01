import React, {useState} from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Segment from '@/components/ui/Segment'
import classNames from '@/utils/classNames'
import sleep from '@/utils/sleep'
import {usePricingStore} from '../store/pricingStore'
import {TbCheck} from 'react-icons/tb'
import {NumericFormat,} from 'react-number-format'
import {Link} from 'react-router'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {FormItem} from "@/components/ui/Form/index.jsx";
import {Controller, useForm} from "react-hook-form";
import {Checkbox, Form} from "@/components/ui/index.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {submitExpertCheckout} from "@/services/CheckoutService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import {useSessionUser} from "@/store/authStore.js";
import {apiGetSettingsProfile} from "@/services/AccontsService.js";

const paymentMethods = [
    {id: 'arca', label: 'Card', logo: 'arca-logo.jpg'},
    {id: 'idram', label: 'IDram', logo: 'idram.webp'},
    {id: 'telcell', label: 'TelCell', logo: 'telcell-logo.jpg'},
]

const validationSchema = z
    .object({
        agree: z.literal(true, {
            errorMap: () => ({
                message: 'You must agree to the terms before continuing.',
            }),
        }),
    })

const PaymentDialog = () => {
    const [loading, setLoading] = useState(false)
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)

    const {t} = useTranslation(false)

    const {
        register,
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


    const {paymentDialog, setPaymentDialog, selectedPlan, setSelectedPlan} = usePricingStore()
    const setUser = useSessionUser((state) => state.setUser)

    const [selectedMethod, setSelectedMethod] = useState('arca')

    const handleDialogClose = async () => {
        reset()
        setPaymentDialog(false)
        await sleep(200)
        reset()
        setSelectedPlan({})
        setPaymentSuccessful(false)
    }

    const handlePaymentChange = (paymentCycle) => {
        setSelectedPlan({
            ...selectedPlan,
            paymentCycle,
        })
    }

    const handlePay = async (values) => {
        setLoading(true)

        try {
            const result = await submitExpertCheckout({
                payment_method: selectedMethod,
                plan_id: selectedPlan.id,
                ...values
            })

            if (result) {
                const res = await apiGetSettingsProfile()
                if (res) {
                    setUser(res)
                }
            }

            setPaymentSuccessful(true)
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            isOpen={paymentDialog}
            closable={!paymentSuccessful}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            {paymentSuccessful ? (
                <>
                    <div className="text-center mt-6 mb-2">
                        <div className="inline-flex rounded-full p-5 bg-success">
                            <TbCheck className="text-5xl text-white"/>
                        </div>
                        <div className="mt-6">
                            <h4>{t("You're all set!")}</h4>
                            <p className="text-base max-w-[400px] mx-auto mt-4 leading-relaxed">
                                {t('Your subscription is now active. You Will receive a confirmation email shortly')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mt-8">
                            {/*<Button block onClick={handleManageSubscription}>*/}
                            {/*    {t('Manage subscription')}*/}
                            {/*</Button>*/}
                            <Button
                                block
                                variant="solid"
                                onClick={handleDialogClose}
                            >
                                {t('Close')}
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <Form onSubmit={handleSubmit(handlePay)}>
                    <h4>{t('Plan')} {' '} {t(selectedPlan.name)}</h4>
                    {selectedPlan.name === 'basic' && (
                        <div className={'mt-6'}>
                            <p>{t("The Basic Plan is free and gives you the basics to explore the platform. When you're ready for more tools and flexibility, you can always upgrade.")}</p>
                        </div>
                    )}
                    {selectedPlan.name !== 'basic' && (
                        <div>
                            <div className="mt-6">
                                <Segment
                                    defaultValue={selectedPlan.paymentCycle}
                                    className="gap-4 flex bg-transparent"
                                    onChange={(value) => handlePaymentChange(value)}
                                >
                                    <Segment.Item value={selectedPlan.price}>
                                        {({active, onSegmentItemClick}) => {
                                            return (
                                                <div
                                                    className={classNames(
                                                        'flex justify-between border rounded-xl border-gray-300 dark:border-gray-600 py-5 px-4 select-none ring-1',
                                                        active
                                                            ? 'ring-primary border-primary'
                                                            : 'ring-transparent bg-gray-100 dark:bg-gray-600',
                                                    )}
                                                    role="button"
                                                    onClick={onSegmentItemClick}
                                                >
                                                    <div>
                                                        <div className="heading-text mb-0.5">
                                                            {t('Pay Monthly')}
                                                        </div>
                                                        <span className="text-lg font-bold heading-text flex gap-0.5">
                                                            <NumericFormat
                                                                displayType="text"
                                                                value={selectedPlan.price}
                                                                prefix={'֏'}
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                            />
                                                            <span>{'/'}</span>
                                                            <span>
                                                                {t('month')}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {(
                                                        <TbCheck className="text-primary text-xl"/>
                                                    )}
                                                </div>
                                            )
                                        }}
                                    </Segment.Item>

                                </Segment>
                            </div>
                            <h4 className={`mt-5 mb-3`}>{t('Select Payment Method')}</h4>
                            <div>
                                <Segment
                                    defaultValue={selectedMethod}
                                    className="gap-4 flex bg-transparent"
                                    onChange={(value) => setSelectedMethod(value)}
                                >
                                    {paymentMethods.map((method) => (
                                        <Segment.Item key={method.id} value={method.id}>
                                            {({active, onSegmentItemClick}) => (
                                                <div
                                                    className={classNames(
                                                        'flex items-center relative border rounded-xl border-gray-300 dark:border-gray-600 py-5 px-4 select-none cursor-pointer',
                                                        active
                                                            ? 'ring-primary border-primary bg-white dark:bg-gray-700'
                                                            : 'ring-transparent bg-gray-100 dark:bg-gray-600'
                                                    )}
                                                    onClick={onSegmentItemClick}
                                                >
                                                    <img
                                                        className="h-[40px] w-[40px]"
                                                        src={`/img/others/${method.logo}`}
                                                        alt="Google sign in"
                                                    />
                                                    <span
                                                        className="text-base font-medium ml-2 hidden lg:block">{t(method.label)}</span>
                                                    {active &&
                                                        <TbCheck size={25}
                                                                 className="text-primary absolute right-1 top-0"/>}
                                                </div>
                                            )}
                                        </Segment.Item>
                                    ))}
                                </Segment>

                            </div>
                            <div className="mt-6 flex flex-col items-end">
                                <h4>
                                    <span>{t('Amount')}: </span>
                                    <span>
                                <NumericFormat
                                    displayType="text"
                                    value={selectedPlan.price}
                                    prefix={'֏'}
                                    thousandSeparator={true}
                                />
                            </span>
                                </h4>
                                {/*<div className="max-w-[350px] ltr:text-right rtl:text-left leading-none mt-2 opacity-80">*/}
                                {/*    <small>*/}
                                {/*        {t('checkout_agreement', {*/}
                                {/*            price: selectedPlan.price*/}
                                {/*        })}*/}
                                {/*    </small>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    )}

                    <div className={'mt-5'}>
                        <FormItem
                            invalid={Boolean(errors.agree)}
                            errorMessage={t(errors.agree?.message)}
                        >
                            <Controller
                                name="agree"
                                control={control}
                                render={({field}) => {
                                    return (
                                        <Checkbox
                                            {...field}
                                        >
                                            <span className={'text-xs'}>{t('I agree with')} {''}</span>
                                            <Link to={`/terms`} className={'underline'}>
                                                <span className={'text-xs'}>{t('Terms of Use')}</span>
                                            </Link>
                                        </Checkbox>
                                    )
                                }}
                            />
                        </FormItem>
                    </div>
                    <div className="mt-6">
                        <Button
                            block
                            variant="solid"
                            loading={loading}
                        >
                            {t(selectedPlan.name === 'basic' ? 'Activate' : 'Pay')}
                        </Button>
                    </div>
                </Form>
            )}
        </Dialog>
    )
}

export default PaymentDialog
