import {useState} from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import {Form, FormItem} from '@/components/ui/Form'
import {apiForgotPassword} from '@/services/AuthService'
import {Controller, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import useTranslation from "@/utils/hooks/useTranslation.js";

const validationSchema = z.object({
    email: z.string().email().min(5),
})

const ForgotPasswordForm = (props) => {
    const [isSubmitting, setSubmitting] = useState(false)
    const {className, setMessage, setEmailSent, emailSent, children} = props
    const {t} = useTranslation()

    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const onForgotPassword = async (values) => {
        const {email} = values
        setSubmitting(true)

        try {
            const resp = await apiForgotPassword({email})
            if (resp) {
                setEmailSent?.(true)
            }
        } catch (errors) {
            setMessage?.(
                typeof errors === 'string' ? errors : 'Some error occurred!',
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            {!emailSent ? (
                <Form onSubmit={handleSubmit(onForgotPassword)}>
                    <FormItem
                        label={t('Email')}
                        invalid={Boolean(errors.email)}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({field}) => (
                                <Input
                                    type="email"
                                    placeholder={t('name@example.com')}
                                    autoComplete="off"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <Button
                        block
                        loading={isSubmitting}
                        variant="solid"
                        type="submit"
                    >
                        {t(isSubmitting ? 'Submitting...' : 'Submit')}
                    </Button>
                </Form>
            ) : (
                <>{children}</>
            )}
        </div>
    )
}

export default ForgotPasswordForm
