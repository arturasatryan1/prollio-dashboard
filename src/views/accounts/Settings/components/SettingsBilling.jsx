import {useState} from 'react'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import BillingHistory from './BillingHistory'
import {apiGetSettingsBilling} from '@/services/AccontsService'
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

    // const [selectedCard, setSelectedCard] = useState({
    //     type: '',
    //     dialogOpen: false,
    //     cardInfo: {},
    // })

    const {
        data = {
            subscription: {
                plan: {
                    name: '',
                    price_monthly: 0,
                },
                status: '',
                type: '',
            },
            transactions: []
        },
    } = useSWR('/api/settings/billing/', () => apiGetSettingsBilling(), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })

    const handleChangePlan = () => {
        navigate('/settings/pricing')
    }

    return (
        <div>
            <h4 className="mb-4">{t('Billing')}</h4>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <Avatar
                                className="bg-emerald-500"
                                shape="circle"
                                icon={<PiLightningFill/>}
                            />
                        </div>
                        <div>
                            <div className="flex items-center mb-2">
                                <h6 className="font-bold">
                                    {t(data.subscription?.plan?.name)}
                                </h6>
                                <Tag className={`rounded-md border-0 ml-2 ${statusColor[data.subscription?.status]}`}>
                                    <span className={`capitalize`}>
                                        {t(data.subscription?.status)}
                                    </span>
                                </Tag>
                            </div>
                            <div className="font-semibold">
                                    <span>
                                    {t('Billing')} {t(data.subscription?.type)}
                                </span>
                                <span> | </span>
                                <span>
                                    {t('Next payment on')} {' '}
                                    {dayjs(
                                        data.subscription?.ends_at ||
                                        0,
                                    )
                                        .format('MM/DD/YYYY')}
                                </span>
                                <span>
                                    <span className="mx-1">
                                            {t('for')}
                                    </span>
                                    <NumericFormat
                                        className="font-bold heading-text"
                                        displayType="text"
                                        value={(
                                            Math.round(
                                                (data.subscription?.plan?.price_monthly || 0) *
                                                100,
                                            ) / 100
                                        ).toFixed(2)}
                                        prefix={'֏'}
                                        thousandSeparator={true}
                                    />
                                </span>

                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <Button
                            size="sm"
                            variant="solid"
                            onClick={handleChangePlan}
                        >
                            {t('Change Plan')}
                        </Button>
                    </div>
                </div>
            </div>
            {/*<div className="mt-8">*/}
            {/*    <h5>Payment method</h5>*/}
            {/*    <div>*/}
            {/*        {data.paymentMethods?.map((card, index) => (*/}
            {/*            <div*/}
            {/*                key={card.cardId}*/}
            {/*                className={classNames(*/}
            {/*                    'flex items-center justify-between p-4',*/}
            {/*                    !isLastChild(data.paymentMethods, index) &&*/}
            {/*                        'border-b border-gray-200 dark:border-gray-600',*/}
            {/*                )}*/}
            {/*            >*/}
            {/*                <div className="flex items-center">*/}
            {/*                    {card.cardType === 'VISA' && (*/}
            {/*                        <img*/}
            {/*                            src="/img/others/img-8.png"*/}
            {/*                            alt="visa"*/}
            {/*                        />*/}
            {/*                    )}*/}
            {/*                    {card.cardType === 'MASTER' && (*/}
            {/*                        <img*/}
            {/*                            src="/img/others/img-9.png"*/}
            {/*                            alt="master"*/}
            {/*                        />*/}
            {/*                    )}*/}
            {/*                    <div className="ml-3 rtl:mr-3">*/}
            {/*                        <div className="flex items-center">*/}
            {/*                            <div className="text-gray-900 dark:text-gray-100 font-semibold">*/}
            {/*                                {card.cardHolderName} ••••{' '}*/}
            {/*                                {card.last4Number}*/}
            {/*                            </div>*/}
            {/*                            {card.primary && (*/}
            {/*                                <Tag className="bg-primary-subtle text-primary rounded-md border-0 mx-2">*/}
            {/*                                    <span className="capitalize">*/}
            {/*                                        {' '}*/}
            {/*                                        Primary{' '}*/}
            {/*                                    </span>*/}
            {/*                                </Tag>*/}
            {/*                            )}*/}
            {/*                        </div>*/}
            {/*                        <span>*/}
            {/*                            Expired{' '}*/}
            {/*                            {months[parseInt(card.expMonth) - 1]} 20*/}
            {/*                            {card.expYear}*/}
            {/*                        </span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="flex">*/}
            {/*                    <Button*/}
            {/*                        size="sm"*/}
            {/*                        type="button"*/}
            {/*                        onClick={() => handleEditCreditCard(card)}*/}
            {/*                    >*/}
            {/*                        Edit*/}
            {/*                    </Button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*        <Button*/}
            {/*            variant="plain"*/}
            {/*            icon={<TbPlus />}*/}
            {/*            onClick={() => {*/}
            {/*                setSelectedCard({*/}
            {/*                    type: 'NEW',*/}
            {/*                    dialogOpen: true,*/}
            {/*                    cardInfo: {},*/}
            {/*                })*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Add payment method*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="mt-8">
                <h5>{t('Transaction history')}</h5>
                <BillingHistory
                    className="mt-4"
                    data={data.transactions}
                />
            </div>
            {/*<CreditCardDialog*/}
            {/*    title={*/}
            {/*        selectedCard.type === 'NEW'*/}
            {/*            ? 'Add credit card'*/}
            {/*            : 'Edit credit card'*/}
            {/*    }*/}
            {/*    defaultValues={selectedCard.cardInfo}*/}
            {/*    dialogOpen={selectedCard.dialogOpen}*/}
            {/*    onDialogClose={handleCreditCardDialogClose}*/}
            {/*    onSubmit={*/}
            {/*        selectedCard.type === 'NEW'*/}
            {/*            ? (values) => handleAddCreditCardSubmit(values)*/}
            {/*            : handleEditCreditCardSubmit*/}
            {/*    }*/}
            {/*/>*/}
        </div>
    )
}

export default SettingsBilling
