import {useMemo} from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useCustomerList from '../hooks/useCustomerList'
import {Link, useNavigate} from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import {TbEye} from 'react-icons/tb'
import dayjs from "dayjs";
import useTranslation from "@/utils/hooks/useTranslation.js";

const statusColor = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({row}) => {
    return (
        <div className="flex items-center">
            {/*<Avatar size={40} shape="circle" src={row.img} />*/}
            <Link
                className={`hover:text-primary font-semibold text-gray-900 dark:text-gray-100`}
                to={`/members/${row.id}`}
            >
                {row.first_name} {row.last_name}
            </Link>
        </div>
    )
}

const ActionColumn = ({onEdit, onViewDetail}) => {
    return (
        <div className="flex items-center gap-3 justify-end">
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

const CustomerListTable = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        customerList,
        customerListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        setSelectedCustomer,
        selectedCustomer,
    } = useCustomerList()

    const handleEdit = (customer) => {
        navigate(`/concepts/customers/customer-edit/${customer.id}`)
    }

    const handleViewDetails = (customer) => {
        navigate(`/members/${customer.id}`)
    }

    const columns = useMemo(
        () => [
            {
                header: t('Name'),
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row}/>
                },
            },
            {
                header: t('Email'),
                accessorKey: 'email',
            },
            {
                header: t('Username'),
                accessorKey: 'username',
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
                header: t('Spent'),
                accessorKey: 'totalSpending',
                cell: (props) => {
                    return <span>֏{props.row.original.spent.toFixed(2)}</span>
                },
            },
            {
                header: t('Joined At'),
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div>
                            {dayjs(row.created_at).format('DD/MM/YYYY')}
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
        if (selectedCustomer.length > 0) {
            setSelectAllCustomer([])
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
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (checked, rows) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={customerList}
            noData={!isLoading && customerList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{width: 28, height: 28}}
            loading={isLoading}
            paginate={customerListTotal > tableData.pageSize}
            pagingData={{
                total: customerListTotal,
                pageIndex: tableData.pageIndex,
                pageSize: tableData.pageSize,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            // onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CustomerListTable
