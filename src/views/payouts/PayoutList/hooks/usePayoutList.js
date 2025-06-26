import { apiGetPayoutList } from '@/services/PayoutService.js'
import useSWR from 'swr'
import { usePayoutListStore } from '../store/payoutListStore.js'

export default function usePayoutList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedItem,
        setSelectedItem,
        setSelectAllItem,
        setFilterData,
    } = usePayoutListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/payouts', { ...tableData, ...filterData }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetPayoutList(params),
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
