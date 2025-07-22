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
import useTranslation from "@/utils/hooks/useTranslation.js";
import useSWR from "swr";
import {apiGetChannelEvents} from "@/services/ChannelService.js";

const { Tr, Td, TBody } = Table

const statusColor = {
    upcoming: 'bg-blue-200 dark:bg-blue-300 text-gray-900 dark:text-gray-900',
    ongoing: 'bg-green-200 dark:bg-green-300 text-gray-900 dark:text-gray-900',
    finished: 'bg-gray-200 dark:bg-gray-300 text-gray-900 dark:text-gray-900',
    cancelled: 'bg-red-200 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const columnHelper = createColumnHelper()

const ChannelHistorySection = ({data}) => {
    const { t } = useTranslation()

    const {data: channels, isLoading} = useSWR(
        ['/api/channels/events', {id: data.id}],
        ([_, params]) => apiGetChannelEvents(params),
        {
            revalidateOnFocus: false,
            // revalidateIfStale: false,
            // revalidateOnReconnect: false,
        },
    )

    const columns = [
        columnHelper.accessor('title', {
            header: t('Title'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center gap-2 w-[200px]">
                        <span className="font-semibold truncate">{row.title}</span>
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
                        <span className="heading-text font-bold capitalize">
                        {row.status}
                    </span>
                    </div>
                )
            },
        }),
        columnHelper.accessor('created_at', {
            header: t('Date'),
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        {dayjs(row.created_at).format('DD/MM/YYYY HH:mm')}
                    </div>
                )
            },
        })
    ]

    const table = useReactTable({
        data: channels || [],
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

export default ChannelHistorySection
