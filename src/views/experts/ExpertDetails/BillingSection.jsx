import {useMemo, useState} from 'react'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Tag from '@/components/ui/Tag'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import {createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable,} from '@tanstack/react-table'
import {NumericFormat} from 'react-number-format'
import {countryList} from '@/constants/countries.constant'
import dayjs from 'dayjs'
import THead from "@/components/ui/Table/THead.jsx";
import Th from "@/components/ui/Table/Th.jsx";

const {Tr, Td, TBody} = Table

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

const columns = [
    columnHelper.accessor('id', {
        header: 'Reference',
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
        header: 'Type',
        cell: (props) => {
            const row = props.row.original
            return <span className="font-semibold">{row.type}</span>
        },
    }),
    columnHelper.accessor('purpose', {
        header: 'Purpose',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        <Tag className={purposeColor[row.purpose]}>
                            <span>{row.purpose}</span>
                        </Tag>
                    </div>
                </div>
            )
        },
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <Badge className={statusColor[row.status]}/>
                    <span className="heading-text font-bold  capitalize">
                        {row.status}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
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
        header: 'Date',
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

const initialSelectedCard = {
    cardHolderName: '',
    ccNumber: '',
    cardExpiry: '',
    code: '',
}

const BillingSection = ({data}) => {
    const [selectedCard, setSelectedCard] = useState(initialSelectedCard)

    const [dialogOpen, setDialogOpen] = useState(false)

    const table = useReactTable({
        data: data.transactions || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const countryName = useMemo(() => {
        return countryList.find(
            (country) => country.value === data.personalInfo?.country,
        )?.label
    }, [data.personalInfo?.country])

    const handleEdit = (cardHolderName, cardExpiry) => {
        setSelectedCard({
            ...initialSelectedCard,
            cardHolderName,
            cardExpiry,
        })
        setDialogOpen(true)
    }

    const handleEditClose = () => {
        setSelectedCard(initialSelectedCard)
        setDialogOpen(false)
    }

    const handleSubmit = () => {
        handleEditClose()
        toast.push(
            <Notification title={'Successfully updated!'} type="success"/>,
            {
                placement: 'top-center',
            },
        )
    }

    return (
        <>
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
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
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
            {/*<h6 className="mt-8">Addresses</h6>*/}
            {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">*/}
            {/*    <Card>*/}
            {/*        <div className="font-bold heading-text">*/}
            {/*            Billing Address*/}
            {/*        </div>*/}
            {/*        <div className="mt-4 flex flex-col gap-1 font-semibold">*/}
            {/*            <span>{data.personalInfo?.address}</span>*/}
            {/*            <span>{data.personalInfo?.city}</span>*/}
            {/*            <span>{data.personalInfo?.postcode}</span>*/}
            {/*            <span>{countryName}</span>*/}
            {/*        </div>*/}
            {/*    </Card>*/}
            {/*    <Card>*/}
            {/*        <div className="font-bold heading-text">*/}
            {/*            Delivery Address*/}
            {/*        </div>*/}
            {/*        <div className="mt-4 flex flex-col gap-1 font-semibold">*/}
            {/*            <span>{data.personalInfo?.address}</span>*/}
            {/*            <span>{data.personalInfo?.city}</span>*/}
            {/*            <span>{data.personalInfo?.postcode}</span>*/}
            {/*            <span>{countryName}</span>*/}
            {/*        </div>*/}
            {/*    </Card>*/}
            {/*</div>*/}
            {/*<h6 className="mt-8">Payment Methods</h6>*/}
            {/*<Card className="mt-4" bodyClass="py-0">*/}
            {/*    {data.paymentMethod?.map((card, index) => (*/}
            {/*        <div*/}
            {/*            key={card.last4Number}*/}
            {/*            className={classNames(*/}
            {/*                'flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4',*/}
            {/*                !isLastChild(data.paymentMethod || [], index) &&*/}
            {/*                    'border-b border-gray-200 dark:border-gray-600',*/}
            {/*            )}*/}
            {/*        >*/}
            {/*            <div className="flex items-center gap-3">*/}
            {/*                {card.cardType === 'VISA' && (*/}
            {/*                    <img src="/img/others/img-8.png" alt="visa" />*/}
            {/*                )}*/}
            {/*                {card.cardType === 'MASTER' && (*/}
            {/*                    <img src="/img/others/img-9.png" alt="master" />*/}
            {/*                )}*/}
            {/*                <div>*/}
            {/*                    <div className="flex items-center">*/}
            {/*                        <div className="text-gray-900 dark:text-gray-100 font-semibold">*/}
            {/*                            {card.cardHolderName} ••••{' '}*/}
            {/*                            {card.last4Number}*/}
            {/*                        </div>*/}
            {/*                        {card.primary && (*/}
            {/*                            <Tag className="bg-sky-100 text-primary dark:bg-primary/20 dark:text-primary rounded-md border-0 mx-2">*/}
            {/*                                <span className="capitalize">*/}
            {/*                                    {' '}*/}
            {/*                                    Primary{' '}*/}
            {/*                                </span>*/}
            {/*                            </Tag>*/}
            {/*                        )}*/}
            {/*                    </div>*/}
            {/*                    <span>*/}
            {/*                        Expired{' '}*/}
            {/*                        {months[parseInt(card.expMonth) - 1]} 20*/}
            {/*                        {card.expYear}*/}
            {/*                    </span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex justify-end">*/}
            {/*                <Button*/}
            {/*                    size="sm"*/}
            {/*                    onClick={() =>*/}
            {/*                        handleEdit(*/}
            {/*                            card.cardHolderName,*/}
            {/*                            `${card.expMonth}${card.expYear}`,*/}
            {/*                        )*/}
            {/*                    }*/}
            {/*                >*/}
            {/*                    Edit*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*    <CreditCardDialog*/}
            {/*        title="Edit credit card"*/}
            {/*        defaultValues={selectedCard}*/}
            {/*        dialogOpen={dialogOpen}*/}
            {/*        onDialogClose={handleEditClose}*/}
            {/*        onSubmit={handleSubmit}*/}
            {/*    />*/}
            {/*</Card>*/}
        </>
    )
}

export default BillingSection
