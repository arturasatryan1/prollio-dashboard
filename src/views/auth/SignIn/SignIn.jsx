import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import OauthSignIn from './components/OauthSignIn'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import useTranslation from '@/utils/hooks/useTranslation'

export const SignInBase = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    disableSubmit,
}) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useThemeStore((state) => state.mode)
    const { t } = useTranslation()

    return (
        <>
            <div className="mb-8">
                <Logo
                    type="streamline"
                    mode={mode}
                    imgClass="mx-auto"
                    logoWidth={60}
                />
            </div>
            <div className="mb-10">
                <h2 className="mb-2">{t('Welcome back!')}</h2>
                <p className="font-semibold heading-text">
                    {t('Please enter your credentials to sign in!')}
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                disableSubmit={disableSubmit}
                setMessage={setMessage}
                passwordHint={
                    <div className="mb-7 mt-2">
                        <ActionLink
                            to={forgetPasswordUrl}
                            className="font-semibold heading-text mt-2 underline"
                            themeColor={false}
                        >
                            {t('Forgot password')}
                        </ActionLink>
                    </div>
                }
            />
            {/*<div className="mt-8">*/}
            {/*    <div className="flex items-center gap-2 mb-6">*/}
            {/*        <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />*/}
            {/*        <p className="font-semibold heading-text">*/}
            {/*            {t('or continue with')}*/}
            {/*        </p>*/}
            {/*        <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />*/}
            {/*    </div>*/}
            {/*    <OauthSignIn*/}
            {/*        disableSubmit={disableSubmit}*/}
            {/*        setMessage={setMessage}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <div className="mt-6 text-center">*/}
            {/*        <span>{t(`Don't have an account yet?`)} </span>*/}
            {/*        <ActionLink*/}
            {/*            to={signUpUrl}*/}
            {/*            className="heading-text font-bold"*/}
            {/*            themeColor={false}*/}
            {/*        >*/}
            {/*            {t('Sign up')}*/}
            {/*        </ActionLink>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

const SignIn = () => {
    return <SignInBase />
}

export default SignIn
