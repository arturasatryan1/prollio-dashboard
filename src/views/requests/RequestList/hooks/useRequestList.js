import { apiGetRequestList } from '@/services/RequestService.js'
import useSWR from 'swr'
import { useRequestListStore } from '../store/requestListStore.js'

export default function useRequestList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedItem,
        setSelectedItem,
        setSelectAllItem,
        setFilterData,
    } = useRequestListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/expert-requests', { ...tableData, ...filterData }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetRequestList(params),
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
