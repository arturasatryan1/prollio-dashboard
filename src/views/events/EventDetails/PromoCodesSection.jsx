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
import useTranslation from "@/utils/hooks/useTranslation.js";

const { Tr, Td, TBody } = Table

const statusColor = {
    completed: 'bg-emerald-500',
    pending: 'bg-amber-400',
    failed: 'bg-red-400',
}

const columnHelper = createColumnHelper()

const PromoCodesSection = ({ data }) => {

    const {t} = useTranslation()

    const columns = [
        columnHelper.accessor('code', {
            header: t('Code'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <span className="font-semibold">{row.code}</span>
                )
            },
        }),
        columnHelper.accessor('type', {
            header: t('Type'),
            cell: (props) => {
                const row = props.row.original
                const label = row.type === 'percent' ? 'Percentage' : 'Fixed Amount'
                return (
                    <span className="capitalize">{t(label)}</span>
                )
            },
        }),
        columnHelper.accessor('value', {
            header: t('Value'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <span>
                    {row.type === 'percent' ? `${row.value}%` : `֏${row.value}`}
                </span>
                )
            },
        }),
        columnHelper.accessor('limit', {
            header: t('Max Usage'),
            cell: (props) => {
                const row = props.row.original
                return <span>{row.limit ?? '∞'}</span>
            },
        }),
        columnHelper.accessor('expires_at', {
            header: t('Expires At'),
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
            header: t('Status'),
            cell: (props) => {
                const row = props.row.original
                const status = row.active ? 'Active' : 'Inactive'
                const color = row.active ? 'bg-emerald-200' : 'bg-gray-300'
                return (
                    <div className="flex items-center gap-2">
                        <Badge className={color} />
                        <span className="capitalize">{t(status)}</span>
                    </div>
                )
            },
        }),
    ]

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
