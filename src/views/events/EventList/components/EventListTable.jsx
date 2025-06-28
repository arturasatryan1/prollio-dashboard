import {useMemo} from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import {Link, useNavigate} from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import {TbEye, TbPencil} from 'react-icons/tb'
import dayjs from "dayjs";
import useEventList from "@/views/events/EventList/hooks/useEventList.js";
import useTranslation from "@/utils/hooks/useTranslation.js";

const statusColor = {
    upcoming: 'bg-blue-200 dark:bg-blue-300 text-gray-900 dark:text-gray-900',
    ongoing: 'bg-green-200 dark:bg-green-300 text-gray-900 dark:text-gray-900',
    finished: 'bg-gray-200 dark:bg-gray-300 text-gray-900 dark:text-gray-900',
    cancelled: 'bg-red-200 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({row}) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                to={`/events/${row.id}`}
            >
                {row.title}
            </Link>
        </div>
    )
}

const ActionColumn = ({onEdit, onViewDetail}) => {
    return (
        <div className="flex items-center gap-3 justify-end">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil size={25}/>
                </div>
            </Tooltip>
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye size={25}/>
                </div>
            </Tooltip>
        </div>
    )
}

const EventListTable = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        itemList,
        itemListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllItem,
        setSelectedItem,
        selectedItem,
    } = useEventList()

    const handleEdit = (item) => {
        navigate(`/events/${item.id}/edit`)
    }

    const handleViewDetails = (item) => {
        navigate(`/events/${item.id}`)
    }

    const columns = useMemo(
        () => [
            {
                header: t('Title'),
                accessorKey: 'title',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row}/>
                },
            },
            {
                header: t('Description'),
                accessorKey: 'description',
                size: 300
            },
            {
                header: t('Members'),
                accessorKey: 'members_count',
            },
            {
                header: t('Earnings'),
                accessorKey: 'payments_sum_amount',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {row.payments_sum_amount || 0}
                        </span>
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
                                <span className="capitalize">{t(row.status)}</span>
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
                            {dayjs(row.created_at).format('DD/MM/YYYY HH:mm')}
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
            },
        ], // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
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
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default EventListTable
