import {useMemo} from 'react'
import Tag from '@/components/ui/Tag'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import {NumericFormat} from 'react-number-format'
import dayjs from 'dayjs'
import useTranslation from "@/utils/hooks/useTranslation.js";

const statusColor = {
    pending: 'bg-amber-400',
    processing: 'bg-blue-200 dark:bg-blue-300 text-gray-900',
    completed: 'bg-emerald-500',
    failed: 'bg-red-200 dark:bg-red-300 text-gray-900',
    cancelled: 'bg-gray-200 dark:bg-gray-300 text-gray-900',
    refunded: 'bg-purple-200 dark:bg-purple-300 text-gray-900',
};

const purposeColor = {
    balance_topup: 'bg-indigo-100 dark:bg-indigo-200 text-gray-900',
    subscription: 'bg-sky-100 dark:bg-sky-200 text-gray-900',
    system_charge: 'bg-orange-100 dark:bg-orange-200 text-gray-900',
    payout: 'bg-rose-100 dark:bg-rose-200 text-gray-900',
    refund: 'bg-purple-100 dark:bg-purple-200 text-gray-900',
    admin_adjustment: 'bg-gray-100 dark:bg-gray-200 text-gray-900',
    event_payment: 'bg-pink-100 dark:bg-pink-200 text-gray-900',
    bonus: 'bg-green-100 dark:bg-green-200 text-gray-900',
};

const paymentMethods = {
    arca: 'ARCA',
    bank_transfer: 'Bank Transfer'
};

const BillingHistory = ({data = [], ...rest}) => {
    const {t} = useTranslation();

    const columns = useMemo(
        () => [
            {
                header: t('Reference'),
                accessorKey: 'uuid',
                // size: 100,
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="heading-text font-bold cursor-pointer">
                            {row.uuid}
                        </span>
                    )
                },
            },
            {
                header: t('Purpose'),
                accessorKey: 'purpose',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <Tag className={purposeColor[row.purpose]}>
                                    <span className="">{t(row.purpose)}</span>
                                </Tag>
                            </div>
                        </div>
                    )
                },
            },
            {
                header: t('Payment Method'),
                accessorKey: 'payment_method',
                cell: (props) => {
                    const row = props.row.original
                    return <span
                        className="font-semibold">{t(paymentMethods[row.payment_method])}</span>
                },
            },
            {
                header: t('Status'),
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-1 sm:gap-2">
                            <Badge className={statusColor[row.status]}/>
                            <span className="heading-text font-bold capitalize">
                                {t(row.status)}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: t('Amount'),
                accessorKey: 'amount',
                cell: (props) => {
                    const row = props.row.original;

                    return (
                        <div className="flex items-center">
                            <NumericFormat
                                displayType="text"
                                value={row.amount}
                                thousandSeparator={true}
                                className=" font-semibold"
                            />
                        </div>
                    );
                },
            },
            {
                header: t('Date'),
                accessorKey: 'created_at',
                size: 160,
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row.created_at).format('D/MM/YYYY, HH:mm')}
                        </div>
                    )
                },
            },
        ], // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    return (
        <DataTable
            columns={columns}
            data={data}
            noData={data.length === 0}
            loading={false}
            paginate={false}
            {...rest}
        />
    )
}

export default BillingHistory
