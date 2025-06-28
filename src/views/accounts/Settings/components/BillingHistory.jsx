import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import Tag from "@/components/ui/Tag/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";

const { Tr, Th, Td, THead, TBody } = Table

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

const columnHelper = createColumnHelper()

const BillingHistory = ({ data = [], ...rest }) => {
    const {t} = useTranslation();

    const columns = [
        columnHelper.accessor('id', {
            header: t('Reference'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <span className="heading-text font-bold cursor-pointer">
                    #{row.id}
                </span>
                )
            },
        }),
        columnHelper.accessor('type', {
            header: t('Type'),
            cell: (props) => {
                const row = props.row.original
                return <span className="font-semibold">{t(row.type)}</span>
            },
        }),
        columnHelper.accessor('purpose', {
            header: t('Purpose'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            <Tag className={purposeColor[row.purpose]}>
                                <span>{t(row.purpose)}</span>
                            </Tag>
                        </div>
                    </div>
                )
            },
        }),
        columnHelper.accessor('status', {
            header: t('Status'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center gap-2">
                        <Badge className={statusColor[row.status]} />
                        <span className="heading-text font-bold  capitalize">
                        {t(row.status)}
                    </span>
                    </div>
                )
            },
        }),
        columnHelper.accessor('amount', {
            header: t('Amount'),
            cell: (props) => {
                const row = props.row.original;
                const isWithdrawal = row.type === 'withdrawal';
                const value = (Math.round(row.amount * 100) / 100).toFixed(2);

                return (
                    <div className="flex items-center">
                        <NumericFormat
                            displayType="text"
                            value={value}
                            prefix={isWithdrawal ? '-' : ''}
                            thousandSeparator={true}
                        />
                    </div>
                );
            },
        }),
        columnHelper.accessor('date', {
            header: t('Date'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {dayjs(row.created_at).format('MM/DD/YYYY')}
                    </div>
                )
            },
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div {...rest}>
            <Table>
                <THead className="bg-transparent!">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </div>
    )
}

export default BillingHistory
