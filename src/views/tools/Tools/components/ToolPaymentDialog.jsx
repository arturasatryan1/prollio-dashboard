import React, {useState} from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Segment from '@/components/ui/Segment'
import classNames from '@/utils/classNames'
import {TbCheck} from 'react-icons/tb'
import {NumericFormat,} from 'react-number-format'
import {Link, useNavigate} from 'react-router'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {FormItem} from "@/components/ui/Form/index.jsx";
import {Controller, useForm} from "react-hook-form";
import {Checkbox, Form} from "@/components/ui/index.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import {useSessionUser} from "@/store/authStore.js";
import {useToolStore} from "@/views/tools/Tools/store/toolStore.js";
import {apiSubmitToolPayment} from "@/services/CheckoutService.js";
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

const ToolPaymentDialog = () => {
    const [loading, setLoading] = useState(false)
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)

    const navigate = useNavigate()
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

    const {toolPaymentDialog, setToolPaymentDialog, selectedTool, setSelectedTool} = useToolStore()
    const setUser = useSessionUser((state) => state.setUser)

    const [selectedMethod, setSelectedMethod] = useState('arca')

    const handleContinueBotSetup = async () => {
        if (paymentSuccessful) {
            setToolPaymentDialog(false)
            setSelectedTool({})
            reset()
            navigate('/tools/lead-bot/setup')
        }
    }
    const handleDialogClose = async (e) => {
        if (loading) {
            return false;
        }

        reset()
        setToolPaymentDialog(false)
        setSelectedTool({})
    }

    const handlePay = async (values) => {
        setLoading(true)

        try {
            const result = await apiSubmitToolPayment({
                payment_method: selectedMethod,
                slug: selectedTool?.slug,
                ...values
            })

            const res = await apiGetSettingsProfile()
            if (res) {
                setUser(res)
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
            isOpen={toolPaymentDialog}
            closable={!loading}
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
                            <h4>{t("Payment Successful")}</h4>
                            <p className="text-base max-w-[400px] mx-auto mt-4 leading-relaxed">
                                You can now continue to activate your Lead Bot.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mt-8">
                            <Button
                                block
                                variant="solid"
                                onClick={handleContinueBotSetup}
                            >
                                {t('Continue to Bot Setup')}
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <Form onSubmit={handleSubmit(handlePay)}>
                    <h4>{t(selectedTool.title)} - Activation</h4>
                    <div>
                        {selectedTool.note && (
                            <div className="mt-6">
                                <h6 className={`mb-1`}>{t('Please Note:')}</h6>
                                <p>{t(selectedTool.note)}</p>
                            </div>
                        )}
                        <h4 className={`mt-5 mb-3`}>{t('Select Payment Method')}</h4>
                        <div>
                            <Segment
                                defaultValue={selectedMethod}
                                className="gap-4 flex bg-transparent"
                                onChange={(value) => setSelectedMethod(value)}
                            >
                                {paymentMethods.map((method, idx) => (
                                    <Segment.Item key={idx} value={method.id}>
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
                                    value={selectedTool.price}
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
                            {t(loading ? 'Processing...' : 'Pay')}
                        </Button>
                    </div>
                </Form>
            )}
        </Dialog>
    )
}

export default ToolPaymentDialog
