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
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const handlePostSubmit = async () => {
        setIsSubmitting(true)

        try {
            const values = getValues();

            const resp = await apiUpdateSettingSecurityPassword({
                current_password: values.currentPassword,
                password: values.newPassword,
                password_confirmation: values.confirmNewPassword,
            })

            toast.push(
                <Notification type="success">Password successfully updated</Notification>,
                {placement: 'top-center'},
            )

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
                    errorMessage={errors.currentPassword?.message}
                >
                    <Controller
                        name="currentPassword"
                        control={control}
                        render={({field}) => (
                            <Input
                                type="password"
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
                    errorMessage={errors.newPassword?.message}
                >
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({field}) => (
                            <Input
                                type="password"
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
                    errorMessage={errors.confirmNewPassword?.message}
                >
                    <Controller
                        name="confirmNewPassword"
                        control={control}
                        render={({field}) => (
                            <Input
                                type="password"
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
                <p>Are you sure you want to change your password?</p>
            </ConfirmDialog>
            {/*  <div className="mb-8">
                <h4>2-Step verification</h4>
                <p>
                    Your account holds great value to hackers. Enable two-step
                    verification to safeguard your account!
                </p>
                <div className="mt-8">
                    {authenticatorList.map((authOption, index) => (
                        <div
                            key={authOption.value}
                            className={classNames(
                                'py-6 border-gray-200 dark:border-gray-600',
                                !isLastChild(authenticatorList, index) &&
                                    'border-b',
                            )}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar
                                        size={35}
                                        className="bg-transparent"
                                        src={authOption.img}
                                    />
                                    <div>
                                        <h6>{authOption.label}</h6>
                                        <span>{authOption.desc}</span>
                                    </div>
                                </div>
                                <div>
                                    {selected2FaType === authOption.value ? (
                                        <Button
                                            size="sm"
                                            customColorClass={() =>
                                                'border-success ring-1 ring-success text-success hover:border-success hover:ring-success hover:text-success bg-transparent'
                                            }
                                            onClick={() =>
                                                setSelected2FaType('')
                                            }
                                        >
                                            Activated
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                setSelected2FaType(
                                                    authOption.value,
                                                )
                                            }
                                        >
                                            Enable
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>*/}
        </div>
    )
}

export default SettingsSecurity
