import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import { usePricingStore } from '../store/pricingStore'
import { apiGetPricingPlans } from '@/services/AccontsService'
import { featuresList } from '../constants'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import useQuery from '@/utils/hooks/useQuery'
import useSWR from 'swr'
import { NumericFormat } from 'react-number-format'
import { TbCheck } from 'react-icons/tb'
import {useAuth} from "@/auth/index.js";
import useTranslation from "@/utils/hooks/useTranslation.js";

const FEATURE_LABELS = {
    channels: 'Ալիքների քանակը',
    dashboard_access: 'Վահանակի հասանելիություն',
    payment_system: 'Վճարման համակարգ',
    support: '24/7 տեխնիկական աջակցություն ',
    analytics: 'Տվյալների վերլուծություն',
    engagement_bot: 'Հետևորդների ներգրավման բոտ',
    event_limit_per_channel: 'Միջոցառումների քանակը',
}

const Plans = () => {
    const { paymentCycle, setPaymentDialog, setSelectedPlan } =
        usePricingStore()

    const { user } = useAuth()
    const { t } = useTranslation()

    const { data } = useSWR(['/api/setting/pricing'], () => apiGetPricingPlans(), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })
    const subscription = user?.expert?.subscription

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-4">
            {data?.map((plan, index) => (
                <div
                    key={plan.id}
                    className={classNames(
                        'px-6 pt-2 flex flex-col justify-between',
                        !isLastChild(data, index) &&
                            'border-r-0 xl:border-r border-gray-200 dark:border-gray-700',
                    )}
                >
                    <div>
                        <h5 className="mb-2 flex items-center gap-2">
                            <h3>{t(plan.name)}</h3>
                            {index === 1 && !subscription && (
                                <Tag className="rounded-full bg-green-200 font-bold">
                                    {t('Recommended')}
                                </Tag>
                            )}
                            {!user?.expert?.active && subscription?.plan_id === plan.id && (
                                <Tag className="rounded-full bg-green-200 font-bold">
                                    {t('Selected Plan')}
                                </Tag>
                            )}
                        </h5>
                        <div className="">{plan.description}</div>
                        {plan.name !== 'basic' ? (
                            <div className="mt-6">
                                <NumericFormat
                                    className="h3"
                                    displayType="text"
                                    value={plan.price_monthly}
                                    prefix={'֏'}
                                    thousandSeparator={true}
                                />
                                <span className="text-lg font-bold">
                                {' '}
                                    /{' '}
                                    {t(paymentCycle === 'monthly' ? 'month' : 'year')}
                            </span>
                            </div>
                        ) : (
                            <div className="mt-6">
                                <span className={'h3'}>{t('Free')}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-4 border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                            {plan?.features?.map((feature) => (
                                <div
                                    key={feature.key}
                                    className="flex items-center gap-4 font-semibold heading-text"
                                >
                                    <>
                                        <TbCheck
                                            className={classNames(
                                                'text-2xl',
                                                feature.value ? 'text-primary' : 'text-gray-100'
                                            )}
                                        />
                                        <span>{FEATURE_LABELS[feature.key]}</span>
                                        <span>{feature.value}</span>
                                    </>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10">
                        <Button
                            block
                            variant={subscription?.plan_id === plan.id && subscription?.status === 'pending' && 'solid'}
                            disabled={
                                subscription?.status !== 'pending' && subscription?.plan_id === plan.id
                            }
                            onClick={() => {
                                setSelectedPlan({
                                    paymentCycle,
                                    name: plan.name,
                                    price: plan.price_monthly,
                                    id: plan.id,
                                })
                                setPaymentDialog(true)
                            }}
                        >
                            {t(
                                subscription?.plan_id === plan.id
                                    ? subscription?.status === 'pending'
                                        ? 'Proceed to Payment'
                                        : 'Current Plan'
                                    : 'Select Plan'
                            )}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Plans
