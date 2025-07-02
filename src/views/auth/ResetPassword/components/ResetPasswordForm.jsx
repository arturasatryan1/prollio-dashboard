import { useState } from 'react'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import { apiResetPassword } from '@/services/AuthService'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {useLocation} from "react-router";

const validationSchema = z
    .object({
        newPassword: z.string({ required_error: 'Please enter your password' }),
        confirmPassword: z.string({
            required_error: 'Confirm Password Required',
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Your passwords do not match',
        path: ['confirmPassword'],
    })

const ResetPasswordForm = (props) => {
    const [isSubmitting, setSubmitting] = useState(false)

    const { className, setMessage, setResetComplete, resetComplete, children } =
        props

    const location = useLocation()
    const {t} = useTranslation();

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const onResetPassword = async (values) => {
        const { newPassword, confirmPassword } = values

        const params = new URLSearchParams(location.search)

        const token = params.get('token')
        const email = params.get('email')

        try {
            const resp = await apiResetPassword({
                password: newPassword,
                password_confirmation: confirmPassword,
                token,
                email
            })

            if (resp) {
                setSubmitting(false)
                setResetComplete?.(true)
            }
        } catch (errors) {
            setMessage?.(
                typeof errors === 'string'
                    ? errors
                    : t('Failed to reset password'),
            )
            setSubmitting(false)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {!resetComplete ? (
                <Form onSubmit={handleSubmit(onResetPassword)}>
                    <FormItem
                        label={t('Password')}
                        invalid={Boolean(errors.newPassword)}
                        errorMessage={t(errors.newPassword?.message)}
                    >
                        <Controller
                            name="newPassword"
                            control={control}
                            render={({ field }) => (
                                <PasswordInput
                                    autoComplete="off"
                                    placeholder="••••••••••••"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label={t('Confirm Password')}
                        invalid={Boolean(errors.confirmPassword)}
                        errorMessage={t(errors.confirmPassword?.message)}
                    >
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <PasswordInput
                                    autoComplete="off"
                                    placeholder="••••••••••••"
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

export default ResetPasswordForm
