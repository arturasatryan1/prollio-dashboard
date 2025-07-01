import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useRequestList from '../hooks/useRequestList.js'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import dayjs from "dayjs";

const statusColor = {
    pending: 'bg-amber-200 dark:bg-amber-300 text-gray-900 dark:text-gray-900',
    approved: 'bg-green-200 dark:bg-green-300 text-gray-900 dark:text-gray-900',
    rejected: 'bg-red-200 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                to={`/requests/${row.id}`}
            >
                {row.first_name} {row.last_name}
            </Link>
        </div>
    )
}

const ActionColumn = ({ onEdit, onViewDetail }) => {
    return (
        <div className="flex items-center gap-3 justify-end">
            {/*<Tooltip title="Edit">*/}
            {/*    <div*/}
            {/*        className={`text-xl cursor-pointer select-none font-semibold`}*/}
            {/*        role="button"*/}
            {/*        onClick={onEdit}*/}
            {/*    >*/}
            {/*        <TbPencil />*/}
            {/*    </div>*/}
            {/*</Tooltip>*/}
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

const RequestListTable = () => {
    const navigate = useNavigate()

    const {
        itemList,
        itemListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllItem,
        setSelectedItem,
        selectedItem,
    } = useRequestList()

    const handleEdit = (item) => {
        navigate(`/requests/edit/${item.id}`)
    }

    const handleViewDetails = (item) => {
        navigate(`/requests/${item.id}`)
    }

    const columns = useMemo(
        () => [
            {
                header: 'Full Name',
                accessorKey: 'user.first_name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Phone',
                accessorKey: 'phone',
            },
            {
                header: 'Status',
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
                header: 'Plan',
                accessorKey: 'plan.name',
                cell: (props) => {
                    const row = props.row.original
                    const plan = row.plan?.name
                    return plan && (
                        <div>
                            {plan.toUpperCase()}
                        </div>
                    )
                },
            },
            {
                header: 'Business',
                accessorKey: 'business_name',
            },
            {
                header: 'Date',
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

export default RequestListTable
