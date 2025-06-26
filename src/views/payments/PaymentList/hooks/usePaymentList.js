import {apiGetPaymentList} from '@/services/PaymentService.js'
import useSWR from 'swr'
import {usePaymentListStore} from '../store/paymentListStore.js'

export default function usePaymentList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedItem,
        setSelectedItem,
        setSelectAllItem,
        setFilterData,
    } = usePaymentListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/payments', { ...tableData, ...filterData }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetPaymentList(params),
        {
            revalidateOnFocus: false,
        },
    )

    const itemList = data?.data || []

    const itemListTotal = data?.total || 0

    return {
        itemList,
        itemListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedItem,
        setSelectedItem,
        setSelectAllItem,
        setFilterData,
    }
}
