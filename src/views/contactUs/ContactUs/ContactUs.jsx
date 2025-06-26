import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import {Form, FormItem} from "@/components/ui/Form/index.jsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from 'zod'
import {Link} from "react-router";


const validationSchema = z.object({
    subject: z
        .string({ required_error: 'Please select a subject' })
        .min(1, { message: '' }),
    message: z
        .string({ required_error: 'Please enter your message' })
        .min(1, { message: '' }),
})

export const options = [
    { label: 'Account & Login Issues', value: 'account' },
    { label: 'Subscription & Billing', value: 'billing' },
    { label: 'Payout & Earnings', value: 'payout' },
    { label: 'Event Management', value: 'event' },
    { label: 'Channel or Bot Issues', value: 'bot' },
    { label: 'Technical Problem', value: 'technical' },
    { label: 'Feature Request', value: 'feature' },
    { label: 'Other / General Question', value: 'other' },
]

const ContactUs = () => {
    const [subject, setSubject] = useState('billing')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setSubmitting] = useState(false)

    const {
        handleSubmit,
        formState: { errors },
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
            <h3 className="mt-2">Contact Us</h3>

            <div className="grid grid-cols-10 gap-10">
                <Form onSubmit={handleSubmit(onSubmit)} className={`mt-8 col-span-5`}>
                    <p className="text-sm text-gray-500 mt-1">
                        If you have any issues or questions, feel free to contact us using the form below.
                    </p>
                    <FormItem
                        label="Subject"
                        invalid={Boolean(errors.subject)}
                        errorMessage={errors.subject?.message}
                    >
                        <Controller
                            name="subject"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="Choose a topic"
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
                        label="Message"
                        invalid={Boolean(errors.message)}
                        errorMessage={errors.message?.message}
                    >
                        <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    textArea
                                    placeholder="Write your message here..."
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <Button block loading={isSubmitting} variant="solid" type="submit">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    {submitted && (
                        <div className="mt-4 text-green-600 font-medium">
                            ✅ Your message has been sent successfully!
                        </div>
                    )}
                </Form>
                <div className="col-span-5">
                    <div className="p-4">
                        <h4 className="text-base font-semibold mb-3">Before You Contact Us</h4>
                        <ul className="pl-5 text-md space-y-5 text-gray-700">
                            <li>
                                <strong>Missing payout?</strong> Please make sure your bank details are up-to-date in{' '}
                                <Link to="/settings/payout" className="text-blue-700 underline">Payout Settings</Link>.
                            </li>
                            <li>
                                <strong>Want to change plan?</strong> Visit{' '}
                                <Link to="/settings/pricing" className="text-blue-700 underline">Pricing</Link> to update your subscription.
                            </li>
                            <li>
                                <strong>Bot not responding?</strong> Try reconnecting your Telegram or checking event setup.
                            </li>
                            <li>
                                You can also check our{' '}
                                <Link to="/support/faq" className="text-blue-700 underline">FAQ</Link> for quick solutions.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ContactUs
