import {useRef, useState} from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {Form, FormItem} from '@/components/ui/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'
import {apiUpdateSettingSecurityPassword} from "@/services/AccontsService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {PasswordInput} from "@/components/shared/index.jsx";

const authenticatorList = [
    {
        label: 'Google Authenticator',
        value: 'googleAuthenticator',
        img: '/img/others/google.png',
        desc: 'Using Google Authenticator app generates time-sensitive codes for secure logins.',
    },
    {
        label: 'Okta Verify',
        value: 'oktaVerify',
        img: '/img/others/okta.png',
        desc: 'Receive push notifications from Okta Verify app on your phone for quick login approval.',
    },
    {
        label: 'E Mail verification',
        value: 'emailVerification',
        img: '/img/others/email.png',
        desc: 'Unique codes sent to email for confirming logins.',
    },
]

const validationSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, {message: 'Please enter your current password!'}),
        newPassword: z
            .string()
            .min(1, {message: 'Please enter your new password!'}),
        confirmNewPassword: z
            .string()
            .min(1, {message: 'Please confirm your new password!'}),
    })
    .refine((data) => data.confirmNewPassword === data.newPassword, {
        message: 'Password not match',
        path: ['confirmNewPassword'],
    })

const SettingsSecurity = () => {
    const [selected2FaType, setSelected2FaType] = useState(
        'googleAuthenticator',
    )
    const [confirmationOpen, setConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formRef = useRef(null)
    const {t} = useTranslation()

    const {
        getValues,
        handleSubmit,
        formState: {errors},
        reset,
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const handlePostSubmit = async () => {
        setIsSubmitting(true)

        try {
            const values = getValues();

            const res = await apiUpdateSettingSecurityPassword({
                current_password: values.currentPassword,
                password: values.newPassword,
                password_confirmation: values.confirmNewPassword,
            })
            if (res) {
                reset()
                toast.push(
                    <Notification type="success">{t('Successfully updated')}</Notification>,
                    {placement: 'top-center'},
                )

            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        }

        setConfirmationOpen(false)
        setIsSubmitting(false)
    }

    const onSubmit = async () => {
        setConfirmationOpen(true)
    }

    return (
        <div>
            <div className="mb-8">
                <h5>{t('Change Password')}</h5>
                <p>
                    {t('Remember, your password is your digital key to your account. Keep it safe, keep it secure!')}
                </p>
            </div>
            <Form
                ref={formRef}
                className="mb-8"
                onSubmit={handleSubmit(handlePostSubmit)}
            >
                <FormItem
                    label={t('Current password')}
                    invalid={Boolean(errors.currentPassword)}
                    errorMessage={t(errors.currentPassword?.message)}
                >
                    <Controller
                        name="currentPassword"
                        control={control}
                        render={({field}) => (
                            <PasswordInput
                                type="text"
                                autoComplete="off"
                                placeholder="•••••••••"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t('New password')}
                    invalid={Boolean(errors.newPassword)}
                    errorMessage={t(errors.newPassword?.message)}
                >
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({field}) => (
                            <PasswordInput
                                type="text"
                                autoComplete="off"
                                placeholder="•••••••••"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t('Confirm new password')}
                    invalid={Boolean(errors.confirmNewPassword)}
                    errorMessage={t(errors.confirmNewPassword?.message)}
                >
                    <Controller
                        name="confirmNewPassword"
                        control={control}
                        render={({field}) => (
                            <PasswordInput
                                type="text"
                                autoComplete="off"
                                placeholder="•••••••••"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <div className="flex justify-end">
                    <Button variant="solid" type="submit">
                        {t('Update')}
                    </Button>
                </div>
            </Form>
            <ConfirmDialog
                isOpen={confirmationOpen}
                type="warning"
                title="Update password"
                confirmButtonProps={{
                    loading: isSubmitting,
                    onClick: handlePostSubmit,
                }}
                onClose={() => setConfirmationOpen(false)}
                onRequestClose={() => setConfirmationOpen(false)}
                onCancel={() => setConfirmationOpen(false)}
            >
                <p>{t('Are you sure you want to change your password?')}</p>
            </ConfirmDialog>
        </div>
    )
}

export default SettingsSecurity
