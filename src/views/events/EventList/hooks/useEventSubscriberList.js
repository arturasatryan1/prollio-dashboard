import { apiGetCustomersList } from '@/services/CustomerService.js'
import useSWR from 'swr'
import {useEventSubscriberListStore} from "@/views/events/EventList/store/eventSubscriberListStore.js";

export default function useSubscriberList() {
    const {
        tableData,
        filterData,
        setTableData,
        setFilterData,
    } = useEventSubscriberListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/event/subscribers', { ...tableData, ...filterData }],
        ([_, params]) => apiGetCustomersList(params),
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
        setFilterData,
    }
}
