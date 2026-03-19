import {useMemo} from 'react'
import DataTable from '@/components/shared/DataTable'
import useTransferList from '../hooks/useTransferList.js'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import useTranslation from '@/utils/hooks/useTranslation.js'
import Dropdown from '../../../../components/ui/Dropdown/index.js'
import {apiUpdateTransferList} from '@/services/TransferService.js'
import toast from '@/components/ui/toast/index.js'
import Notification from '@/components/ui/Notification/index.jsx'
import {FiChevronDown} from "react-icons/fi";

const statusColor = {
    pending: 'bg-amber-200 dark:bg-amber-300 text-gray-900 dark:text-gray-900',
    completed: 'bg-green-200 dark:bg-green-300 text-gray-900 dark:text-gray-900',
    failed: 'bg-red-200 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const ActionColumn = ({row, onUpdateStatus}) => {
    const {t} = useTranslation()

    return (
        <div
            className={`flex items-center gap-3 p-2 justify-center rounded-md ${statusColor[row.status]}`}
        >
            <Dropdown renderTitle={
                <div
                    className={` py-1 cursor-pointer flex items-center gap-2`}
                >
                    <span className="capitalize">{t(row.status)}</span>
                    <span className="text-xs"><FiChevronDown/></span>
                </div>
            } placement="bottom-end">
                {['pending', 'completed', 'failed'].map((status) => (
                    <Dropdown.Item
                        key={status}
                        className="justify-between"
                        eventKey={status}
                        onClick={() => onUpdateStatus(row.id, status, t)}
                    >
                        <span className="capitalize">{t(status)}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}

const TransferListTable = () => {
    const {
        itemList,
        itemListTotal,
        tableData,
        isLoading,
        mutate,
        setTableData,
        setSelectAllItem,
        setSelectedItem,
        selectedItem,
    } = useTransferList()

    const {t} = useTranslation()

    const handleUpdateStatus = async (id, status, t) => {
        const resp = await apiUpdateTransferList(id, {status})

        if (resp) {
            await mutate(
                (currentData) => {
                    if (!currentData) return currentData

                    return {
                        ...currentData,
                        data: currentData.data.map((item) =>
                            item.id === id ? {...item, status} : item
                        ),
                    }
                },
                false
            )

            toast.push(
                <Notification type="success">
                    {t('Successfully updated')}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const columns = useMemo(
        () => [
            {
                header: t('ID'),
                accessorKey: 'uuid',
            },
            {
                header: t('Expert'),
                accessorKey: 'first_name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            {row?.first_name} {row?.last_name}
                        </div>
                    )
                },
            },
            {
                header: t('Amount'),
                accessorKey: 'amount',
                cell: (props) => {
                    const row = props.row.original
                    return <div>{row.amount}</div>
                },
            },
            {
                header: t('Account Number'),
                accessorKey: 'account_number',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            {row.account_number} <span>({row.bank_name})</span>
                        </div>
                    )
                },
            },
            {
                header: t('Calculated'),
                accessorKey: 'covers_from',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            {row.covers_from
                                ? `${dayjs(row.covers_from).format('DD/MM/YYYY')}-${dayjs(row.covers_to).format('DD/MM/YYYY')}`
                                : '–'}
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
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        row={props.row.original}
                        onUpdateStatus={handleUpdateStatus}
                    />
                ),
            },
        ],
        [t]
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
            skeletonAvatarProps={{width: 28, height: 28}}
            loading={isLoading}
            pagingData={{
                total: itemListTotal,
                pageIndex: tableData.pageIndex,
                pageSize: tableData.pageSize,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default TransferListTable