import { apiGetCustomersList } from '@/services/CustomerService.js'
import useSWR from 'swr'
import { useCustomerListStore } from '../store/customerListStore'

export default function useCustomerList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        selectedAllCustomers,
        setSelectAllCustomer,
        setFilterData,
    } = useCustomerListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/customers', { ...tableData, ...filterData }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetCustomersList(params),
        {
            revalidateOnFocus: false,
        },
    )

    const customerList = data?.data || []
    const customerListTotal = data?.total || 0

    return {
        customerList,
        customerListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        selectedAllCustomers,
        setSelectAllCustomer,
        setFilterData,
    }
}
