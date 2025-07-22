import { apiGetEventList } from '@/services/EventService.js'
import useSWR from 'swr'
import { useEventListStore } from '../store/eventListStore.js'

export default function useEventList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedItem,
        setSelectedItem,
        setSelectAllItem,
        setFilterData,
    } = useEventListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/events', { ...tableData, ...filterData }],
        ([_, params]) => apiGetEventList(params),
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
