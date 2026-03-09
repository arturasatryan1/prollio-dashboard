import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import BillingHistory from './BillingHistory'
import {apiGetSettingsBilling} from '@/services/AccontsService'
import {apiGetTransactions} from '@/services/TransactionService'
import useSWR from 'swr'
import dayjs from 'dayjs'
import {useNavigate} from 'react-router'
import {PiLightningFill} from 'react-icons/pi'
import {NumericFormat} from 'react-number-format'
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
            <h4 className="mb-4">{t('Plan')}</h4>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 w-full">

                        <Avatar
                            className={subscription ? "bg-emerald-500 shrink-0" : "shrink-0"}
                            shape="circle"
                            icon={<PiLightningFill />}
                        />

                        {subscription ? (
                            <div className="w-full">

                                {/* Plan Name + Status */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                    <h6 className="font-bold text-base sm:text-lg">
                                        {t(subscription?.plan?.name)}
                                    </h6>

                                    <Tag
                                        className={`rounded-md border-0 w-fit ${statusColor[subscription?.status]}`}
                                    >
                                <span className="capitalize">
                                    {t(subscription?.status)}
                                </span>
                                    </Tag>
                                </div>

                                {/* Expiration */}
                                <div className="font-semibold text-sm sm:text-base">
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
                    <div className="w-full lg:w-auto">
                        <Button
                            size="sm"
                            variant="solid"
                            className="w-full lg:w-auto"
                            onClick={handleChangePlan}
                        >
                            {t(subscription ? 'Change Plan' : 'Buy Plan')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="mt-6 sm:mt-8">
                <h5 className="text-base sm:text-lg">
                    {t('Transaction history')}
                </h5>

                <BillingHistory
                    className="mt-4 overflow-x-auto"
                    data={transactions}
                />
            </div>
        </div>
    )
}

export default SettingsBilling
