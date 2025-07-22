import { apiGetEventSubscribers } from '@/services/EventService.js'
import useSWR from 'swr'
import {useSubscriberListStore} from "@/views/customers/CustomerList/store/subscriberListStore.js";

export default function useSubscriberList(id) {
    const {
        tableData,
        filterData,
        setTableData,
        setFilterData,
    } = useSubscriberListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/members', {id, ...tableData, ...filterData }],
        ([_, params]) => apiGetEventSubscribers(params),
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
