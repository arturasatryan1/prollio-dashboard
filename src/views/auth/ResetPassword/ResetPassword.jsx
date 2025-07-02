import { useState } from 'react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import ActionLink from '@/components/shared/ActionLink'
import ResetPasswordForm from './components/ResetPasswordForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router'
import useTranslation from "@/utils/hooks/useTranslation.js";

export const ResetPasswordBase = ({ signInUrl = '/sign-in' }) => {
    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()
    const {t} = useTranslation()

    const handleContinue = () => {
        navigate(signInUrl)
    }

    return (
        <div>
            <div className="mb-6">
                {resetComplete ? (
                    <>
                        <h3 className="mb-1">{t('Reset done')}</h3>
                        <p className="font-semibold heading-text">
                            {t('New password set successfully')}
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-1">{t('Set a new password')}</h3>
                        <p className="font-semibold heading-text">
                            {t('Your new password must be different from your previous password')}
                        </p>
                    </>
                )}
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <ResetPasswordForm
                resetComplete={resetComplete}
                setMessage={setMessage}
                setResetComplete={setResetComplete}
            >
                <Button
                    block
                    variant="solid"
                    type="button"
                    onClick={handleContinue}
                >
                    {t('Continue')}
                </Button>
            </ResetPasswordForm>
            <div className="mt-4 text-center">
                <span>{t('Back to')} </span>
                <ActionLink
                    to={signInUrl}
                    className="heading-text font-bold"
                    themeColor={false}
                >
                    {t('Sign In')}
                </ActionLink>
            </div>
        </div>
    )
}

const ResetPassword = () => {
    return <ResetPasswordBase />
}

export default ResetPassword
