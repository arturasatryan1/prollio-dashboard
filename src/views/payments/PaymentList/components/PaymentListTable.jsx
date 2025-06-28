import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import usePaymentList from '../hooks/usePaymentList.js'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from "dayjs";
import useTranslation from "@/utils/hooks/useTranslation.js";

const statusColor = {
    pending: 'bg-amber-200 dark:bg-amber-300 text-gray-900 dark:text-gray-900',
    processing: 'bg-blue-200 dark:bg-amber-300 text-gray-900 dark:text-gray-900',
    completed: 'bg-green-200 dark:bg-green-300 text-gray-900 dark:text-gray-900',
    failed: 'bg-red-200 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const PaymentListTable = () => {
    const {
        itemList,
        itemListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllItem,
        setSelectedItem,
        selectedItem,
    } = usePaymentList()

    const {t} =  useTranslation()

    const columns = useMemo(
        () => [
            {
                header: t('ID'),
                accessorKey: 'uuid',
            },
            {
                header: t('Member'),
                accessorKey: 'member.first_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>{row?.member?.first_name} {row?.member?.last_name}</div>
                    )
                },
            },
            {
                header: t('Event'),
                accessorKey: 'event.title',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>{row?.event?.title}</div>
                    )
                },
            },
            {
                header: t('Amount'),
                accessorKey: 'amount',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            ${Number(row.amount).toFixed(2)}
                        </div>
                    )
                },
            },
            {
                header: t('Status'),
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status]}>
                                <span className="capitalize">{row.status}</span>
                            </Tag>
                        </div>
                    )
                },
            },

            {
                header: t('Date'),
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            {row.created_at
                                ? dayjs(row.created_at).format('DD/MM/YYYY HH:mm')
                                : '–'}
                        </div>
                    )
                },
            },
        ],
        [], // eslint-disable-next-line react-hooks/exhaustive-deps
    )


    const handleSetTableData = (data) => {
        setTableData(data)
        if (selectedItem.length > 0) {
            setSelectAllItem([])
        }
    }

    const handlePaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked, row) => {
        setSelectedItem(checked, row)
    }

    const handleAllRowSelect = (checked, rows) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllItem(originalRows)
        } else {
            setSelectAllItem([])
        }
    }

    return (
        <DataTable
            columns={columns}
            data={itemList}
            noData={!isLoading && itemList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: itemListTotal,
                pageIndex: tableData.pageIndex,
                pageSize: tableData.pageSize,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default PaymentListTable
