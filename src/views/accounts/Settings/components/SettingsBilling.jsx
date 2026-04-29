import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'
import BillingHistory from './BillingHistory'
import {apiGetSettingsBilling} from '@/services/AccontsService'
import {apiGetTransactions} from '@/services/TransactionService'
import useSWR from 'swr'
import dayjs from 'dayjs'
import {useNavigate} from 'react-router'
import {PiLightningFill} from 'react-icons/pi'
import useTranslation from "@/utils/hooks/useTranslation.js";

const statusColor = {
    pending: 'bg-yellow-400 text-gray-900',
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    canceled: 'bg-gray-400 text-white',
    expired: 'bg-red-300 text-gray-900',
    paused: 'bg-blue-200 text-gray-900',
    failed: 'bg-red-500 text-white',
};

const SettingsBilling = () => {
    const navigate = useNavigate()

    const {t} = useTranslation()

    const {
        data: subscription,
    } = useSWR('/api/settings/billing', () => apiGetSettingsBilling(), {
        revalidateOnFocus: false,
        // revalidateIfStale: false,
        // revalidateOnReconnect: false,
    })

    const {
        data: transactions,
    } = useSWR('/api/settings/transactions', () => apiGetTransactions(), {
        revalidateOnFocus: false,
        // revalidateIfStale: false,
        // revalidateOnReconnect: false,
    })

    const handleChangePlan = () => {
        navigate('/settings/pricing')
    }

    return (
         <div>
            {/*<h4 className="mb-4 text-lg sm:text-xl">{t('Plan')}</h4>*/}

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-6">
                <div className="flex flex-col gap-4 sm:gap-6">

                    {/* LEFT SIDE */}
                    <div className="flex sm:flex-row sm:items-start gap-3 sm:gap-4 w-full ">

                        <Avatar
                            className={subscription ? "bg-emerald-500 shrink-0" : "shrink-0"}
                            shape="circle"
                            icon={<PiLightningFill />}
                        />

                        {subscription ? (
                            <div className="w-full flex-1 min-w-0">

                                {/* Plan Name + Status */}
                                <div className="flex sm:flex-row sm:items-center gap-2 mb-2 sm:mb-3">
                                    <h6 className="font-bold text-base sm:text-lg truncate">
                                        {t(subscription?.plan?.name)}
                                    </h6>

                                    <Tag
                                        className={`rounded-md border-0 w-fit shrink-0 ${statusColor[subscription?.status]}`}
                                    >
                                <span className="capitalize text-xs sm:text-sm">
                                    {t(subscription?.status)}
                                </span>
                                    </Tag>
                                </div>

                                {/* Expiration */}
                                <div className="font-semibold text-xs sm:text-base text-gray-600 dark:text-gray-300">
                                    {t("Active until")}{" "}
                                    {dayjs(subscription.ends_at).format('MM.DD.YYYY')}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full">
                                <h6 className="font-bold text-base sm:text-lg">
                                    {t("You don’t have an active plan at the moment")}
                                </h6>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE BUTTON */}
                    <div className="w-full md:w-auto">
                        <Button
                            size="sm"
                            variant="solid"
                            className="w-full md:w-auto"
                            onClick={handleChangePlan}
                        >
                            {t(subscription ? 'Change Plan' : 'Buy Plan')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="mt-6 sm:mt-8">
                <h5 className="text-base sm:text-lg px-0 sm:px-0 text-center sm:text-left">
                    {t('Transaction history')}
                </h5>

                <div className="mt-4">
                    <BillingHistory
                        data={transactions}
                    />
                </div>
            </div>
        </div>
    )
}

export default SettingsBilling
