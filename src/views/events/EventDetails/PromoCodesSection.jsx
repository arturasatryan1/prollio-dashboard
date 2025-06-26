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
import React from "react";

const { Tr, Td, TBody } = Table

const statusColor = {
    completed: 'bg-emerald-500',
    pending: 'bg-amber-400',
    failed: 'bg-red-400',
}

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor('code', {
        header: 'Code',
        cell: (props) => {
            const row = props.row.original
            return (
                <span className="font-semibold">{row.code}</span>
            )
        },
    }),
    columnHelper.accessor('discount_type', {
        header: 'Type',
        cell: (props) => {
            const row = props.row.original
            const label = row.discount_type === 'percent' ? 'Percentage' : 'Fixed'
            return (
                <span className="capitalize">{label}</span>
            )
        },
    }),
    columnHelper.accessor('discount_value', {
        header: 'Value',
        cell: (props) => {
            const row = props.row.original
            return (
                <span>
                    {row.discount_type === 'percent' ? `${row.discount_value}%` : `֏${row.discount_value}`}
                </span>
            )
        },
    }),
    columnHelper.accessor('usage_limit', {
        header: 'Max Usage',
        cell: (props) => {
            const row = props.row.original
            return <span>{row.usage_limit ?? '∞'}</span>
        },
    }),
    columnHelper.accessor('expires_at', {
        header: 'Expires At',
        cell: (props) => {
            const row = props.row.original
            return (
                <span>
                    {row.expires_at ? dayjs(row.expires_at).format('DD/MM/YYYY') : '—'}
                </span>
            )
        },
    }),
    columnHelper.accessor('active', {
        header: 'Status',
        cell: (props) => {
            const row = props.row.original
            const status = row.active ? 'Active' : 'Inactive'
            const color = row.active ? 'bg-emerald-200' : 'bg-gray-300'
            return (
                <div className="flex items-center gap-2">
                    <Badge className={color} />
                    <span className="capitalize">{status}</span>
                </div>
            )
        },
    }),
]

const PromoCodesSection = ({ data }) => {

    console.log(data);
    const table = useReactTable({
        data: data || [],
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
        </>
    )
}

export default PromoCodesSection
