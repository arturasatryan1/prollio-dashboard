import { useState } from 'react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import ActionLink from '@/components/shared/ActionLink'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router'
import useTranslation from "@/utils/hooks/useTranslation.js";

export const ForgotPasswordBase = ({ signInUrl = '/sign-in' }) => {
    const [emailSent, setEmailSent] = useState(false)
    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()
    const {t} = useTranslation()

    const handleContinue = () => {
        navigate(signInUrl)
    }

    return (
        <div>
            <div className="mb-6">
                {emailSent ? (
                    <>
                        <h3 className="mb-2">{t('Check your email')}</h3>
                        <p className="font-semibold heading-text">
                            {t('We have sent a password recovery to your email')}
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-2">{t('Forgot password')}</h3>
                        <p className="font-semibold heading-text">
                            {t('Please enter your email to receive a verification code')}
                        </p>
                    </>
                )}
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <ForgotPasswordForm
                emailSent={emailSent}
                setMessage={setMessage}
                setEmailSent={setEmailSent}
            >
                <Button
                    block
                    variant="solid"
                    type="button"
                    onClick={handleContinue}
                >
                    {t('Continue')}
                </Button>
            </ForgotPasswordForm>
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

const ForgotPassword = () => {
    return <ForgotPasswordBase />
}

export default ForgotPassword
