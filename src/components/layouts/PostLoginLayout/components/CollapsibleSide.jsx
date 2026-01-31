import SideNav from '@/components/template/SideNav'
import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import UserProfileDropdown from '@/components//template/UserProfileDropdown'
import LayoutBase from '@/components//template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import LanguageSelector from "@/components/template/LanguageSelector.jsx";
import Notification from '@/components/template/Notification'
import {Alert, Button} from "@/components/ui/index.js";
import {Link, useNavigate} from "react-router";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {useAuth} from "@/auth/index.js";
import TourButton from "@/components/template/TourButton.jsx";
import {useSettingsStore} from "@/views/accounts/Settings/store/settingsStore.js";

const CollapsibleSide = ({ children }) => {
    const { larger, smaller } = useResponsive()

    const navigate = useNavigate()
    const {t} = useTranslation();
    const {user} = useAuth();

    const { setCurrentView } = useSettingsStore()

    return (
        <LayoutBase
            type={LAYOUT_COLLAPSIBLE_SIDE}
            className="app-layout-collapsible-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && <SideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow-sm dark:shadow-2xl"
                        headerStart={
                            <>
                                {smaller.lg && <MobileNav />}
                                {larger.lg && <SideNavToggle />}
                            </>
                        }
                        headerEnd={
                            <>
                                {/*<TourButton />*/}
                                <LanguageSelector />
                                <Notification />
                                {/*<SidePanel />*/}
                                <UserProfileDropdown hoverable={false} />
                            </>
                        }
                    />
                    <div className="h-full flex flex-auto flex-col">
                            {user?.expert && !user?.expert?.active && (
                                <Alert type="warning" className="rounded-none px-8 py-2">
                                    {t('To start using Prollio and access your dashboard features, please activate your expert account by completing the payment for the subscription plan you selected.')}
                                    {' '}
                                    {/*{t('Go to')}{' '}*/}
                                    <Link to="/settings/pricing" className="text-blue-500 underline">
                                        {t('here')}
                                    </Link>
                                    {' '} {t('and pay')}
                                </Alert>
                            )}
                        {user?.expert && !user?.expert?.bank_account && (
                                <Alert type="warning" className="rounded-none px-8 py-2 mt-1">
                                    {t('You haven’t added a bank account yet. To receive your earnings, set one up')}
                                    {' '}
                                    <span
                                        className="text-blue-500 underline cursor-pointer"
                                        onClick={() => {
                                            setCurrentView('business')
                                            navigate('/settings/account')
                                        }}
                                    >

                                        {t('here')}
                                    </span>
                                </Alert>
                            )}

                            {/*{alerts?.payment_missing && (*/}
                            {/*    <Alert type="danger" className="mb-4">*/}
                            {/*        💳 No subscription detected. <Link to="/settings/pricing">Choose a plan</Link> to activate your account.*/}
                            {/*    </Alert>*/}
                            {/*)}*/}
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default CollapsibleSide
