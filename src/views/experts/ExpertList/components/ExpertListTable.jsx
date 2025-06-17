import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useExpertList from '../hooks/useExpertList.js'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'

const statusColor = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    inactive: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <Avatar size={40} shape="circle" src={row.avatar} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/experts/${row.id}`}
            >
                {row.first_name} {row.last_name}
            </Link>
        </div>
    )
}

const ActionColumn = ({ onEdit, onViewDetail }) => {
    return (
        <div className="flex items-center gap-3">
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
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const ExpertListTable = () => {
    const navigate = useNavigate()

    const {
        expertList,
        expertListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllExpert,
        setSelectedExpert,
        selectedExpert,
    } = useExpertList()

    const handleEdit = (expert) => {
        navigate(`/experts/edit/${expert.id}`)
    }

    const handleViewDetails = (expert) => {
        navigate(`/experts/${expert.id}`)
    }

    const columns = useMemo(
        () => [
            {
                header: 'Full Name',
                accessorKey: 'user.first_name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row.user} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'user.email',
            },
            {
                header: 'Phone',
                accessorKey: 'user.phone',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    const status = row.active ? 'active' : 'inactive'
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[status]}>
                                <span className="capitalize">{status}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: 'Active Plan',
                accessorKey: 'plan.name',
                cell: (props) => {
                    const row = props.row.original
                    const plan = row.plan.name
                    return (
                        <div>
                            {plan.toUpperCase()}
                        </div>
                    )
                },
            },
            {
                header: 'Balance',
                accessorKey: 'balance',
                cell: (props) => {
                    return <span>${props.row.original.balance}</span>
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
        if (selectedExpert.length > 0) {
            setSelectAllExpert([])
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
        setSelectedExpert(checked, row)
    }

    const handleAllRowSelect = (checked, rows) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllExpert(originalRows)
        } else {
            setSelectAllExpert([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={expertList}
            noData={!isLoading && expertList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: expertListTotal,
                pageIndex: tableData.pageIndex,
                pageSize: tableData.pageSize,
            }}
            checkboxChecked={(row) =>
                selectedExpert.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            // onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ExpertListTable
