import {useState} from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import {Form, FormItem} from "@/components/ui/Form/index.jsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod'
import {Link} from "react-router";
import useTranslation from "@/utils/hooks/useTranslation.js";


const validationSchema = z.object({
    subject: z
        .string({required_error: 'Please select a subject'})
        .min(1, {message: ''}),
    message: z
        .string({required_error: 'Please enter your message'})
        .min(1, {message: ''}),
})

const ContactUs = () => {
    const [subject, setSubject] = useState('billing')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setSubmitting] = useState(false)

    const {t} = useTranslation()

    const options = [
        {label: t('Account & Login Issues'), value: 'account'},
        {label: t('Subscription & Billing'), value: 'billing'},
        {label: t('Payout & Earnings'), value: 'payout'},
        {label: t('Event Management'), value: 'event'},
        {label: t('Channel or Bot Issues'), value: 'bot'},
        {label: t('Technical Problem'), value: 'technical'},
        {label: t('Feature Request'), value: 'feature'},
        {label: t('Other / General Question'), value: 'other'},
    ]

    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues: {
            subject: '',
            message: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values) => {
        if (isSubmitting) return


        console.log(values);
        setSubmitting(true)

        console.log('Contact message sent:', values)

        setTimeout(() => {
            setSubmitted(true)
            setSubmitting(false)
        }, 1000)
    }

    return (
        <Card>
            <h3 className="mt-2">{t('Contact Us')}</h3>

            <div className="grid grid-cols-10 gap-10">
                <Form onSubmit={handleSubmit(onSubmit)} className={`mt-2 col-span-5`}>
                    <p className="text-sm text-gray-500 my-4">
                        {t('If you have any issues or questions, feel free to contact us using the form below.')}
                    </p>
                    <FormItem
                        label={t('Subject')}
                        invalid={Boolean(errors.subject)}
                        errorMessage={errors.subject?.message}
                    >
                        <Controller
                            name="subject"
                            control={control}
                            render={({field}) => (
                                <Select
                                    placeholder={t('Choose a topic')}
                                    options={options}
                                    value={options.filter(
                                        (option) => option.value === field.value,
                                    )}
                                    onChange={(selected) => {
                                        field.onChange(selected?.value)
                                    }}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label={t('Message')}
                        invalid={Boolean(errors.message)}
                        errorMessage={errors.message?.message}
                    >
                        <Controller
                            name="message"
                            control={control}
                            render={({field}) => (
                                <Input
                                    textArea
                                    placeholder={t('Write your message here')}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <Button block loading={isSubmitting} variant="solid" type="submit">
                        {t(isSubmitting ? 'Sending...' : 'Send Message')}
                    </Button>

                    {submitted && (
                        <div className="mt-4 text-green-600 font-medium">
                            ✅ {t('Your message has been sent successfully!')}
                        </div>
                    )}
                </Form>
                <div className="col-span-5">
                    <div className="p-4">
                        <h4 className="text-base font-semibold mb-3">{t('Before You Contact Us')}</h4>
                        <ul className="pl-5 text-md space-y-5 text-gray-700">
                            <li>
                                <p className={'my-1'}><strong>{t('Missing payout?')}</strong></p>
                                <p>
                                    {t('Please make sure your bank details are up-to-date in')}{' '}
                                    <Link to="/settings/payout" className="text-blue-700 underline">{t('Payout Settings')}</Link>
                                </p>
                            </li>
                            <li>
                                <p className={'my-1'}><strong>{t('Want to change plan?')}</strong></p>
                                <p>
                                    {t('Visit')}{' '}
                                    <Link to="/settings/pricing" className="text-blue-700 underline">{t('Pricing')}</Link> {' '}
                                    {t('to update your subscription.')}
                                </p>
                            </li>
                            <li>
                                <p className={'my-1'}><strong>{t('Bot not responding?')}</strong></p>
                                <p>
                                    {t('Try reconnecting your Telegram or checking event setup.')}
                                </p>
                            </li>
                            <li>
                                <p className={'my-1'}>
                                    <span>{t('You can also check our')}{' '}</span>
                                    <Link to="/support/faq" className="text-blue-700 underline">{t('FAQ')}</Link>{' '}
                                    <span>{t('for quick solutions.')}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ContactUs
