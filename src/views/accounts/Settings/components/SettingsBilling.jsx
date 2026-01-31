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
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <Avatar
                                className={subscription ? "bg-emerald-500" : ""}
                                shape="circle"
                                icon={<PiLightningFill/>}
                            />
                        </div>
                        {subscription && (
                            <div>
                                <div className="flex items-center mb-2">
                                    <h6 className="font-bold mr-2">
                                        {t(subscription?.plan?.name)}
                                    </h6>
                                    <Tag className={`rounded-md border-0 ${statusColor[subscription?.status]}`}>
                                    <span className={`capitalize`}>
                                        {t(subscription?.status)}
                                    </span>
                                    </Tag>
                                </div>
                                <div className="font-semibold">

                                    <span> {t("Active until")} {dayjs(subscription.ends_at).format('MM.DD.YYYY')}</span>
                                {/*    <span>*/}
                                {/*    {t('Billing')} {t(subscription?.type)}*/}
                                {/*</span>*/}
                                {/*    <span> | </span>*/}
                                {/*    <span>*/}
                                {/*    {t('Next payment on')} {' '}*/}
                                {/*        {dayjs(*/}
                                {/*            subscription?.ends_at ||*/}
                                {/*            0,*/}
                                {/*        )*/}
                                {/*            .format('MM/DD/YYYY')}*/}
                                {/*</span>*/}
                                {/*    <span>*/}
                                {/*    <span className="mx-1">*/}
                                {/*            {t('for')}*/}
                                {/*    </span>*/}
                                {/*    <NumericFormat*/}
                                {/*        className="font-bold heading-text"*/}
                                {/*        displayType="text"*/}
                                {/*        value={subscription?.plan?.price_monthly}*/}
                                {/*        suffix={'֏'}*/}
                                {/*        thousandSeparator={true}*/}
                                {/*    />*/}
                                {/*</span>*/}

                                </div>
                            </div>
                        )}
                        {!subscription && (
                            <div>
                                <div className="flex items-center">
                                    <h6 className="font-bold">
                                        {t("You don’t have an active plan at the moment")}
                                    </h6>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="flex">
                        <Button
                            size="sm"
                            variant="solid"
                            onClick={handleChangePlan}
                        >
                            {t(subscription? 'Change Plan' : 'Buy Plan')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h5>{t('Transaction history')}</h5>
                <BillingHistory
                    className="mt-4"
                    data={transactions}
                />
            </div>
        </div>
    )
}

export default SettingsBilling
