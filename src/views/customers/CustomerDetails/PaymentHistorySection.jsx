import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import Th from "@/components/ui/Table/Th.jsx";
import THead from "@/components/ui/Table/THead.jsx";

const { Tr, Td, TBody } = Table

const statusColor = {
    completed: 'bg-emerald-500',
    pending: 'bg-amber-400',
    failed: 'bg-red-400',
}

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor('event', {
        header: 'Event',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{row.event.title}</span>
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
                    <Badge className={statusColor[row.status]} />
                    <span className="heading-text font-bold capitalize">
                        {row.status}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('date', {
        header: 'Jined At',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {dayjs(row.created_at).format('DD/MM/YYYY HH:mm')}
                </div>
            )
        },
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <NumericFormat
                        displayType="text"
                        value={(Math.round(row.amount * 100) / 100).toFixed(2)}
                        prefix={'֏'}
                        thousandSeparator={true}
                    />
                </div>
            )
        },
    }),
]

const PaymentHistorySection = ({ data }) => {
    const table = useReactTable({
        data: data.payments || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <>
            <Table>
                <THead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <Th key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </Th>
                            ))}
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
            {/*            <span>{data.payment?.channel?.name}</span>*/}
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
        </>
    )
}

export default PaymentHistorySection
