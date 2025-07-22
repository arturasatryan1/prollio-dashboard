import { apiGetChannelList } from '@/services/ChannelService.js'
import useSWR from 'swr'
import { useChannelListStore } from '../store/channelListStore.js'

export default function useChannelList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedItem,
        setSelectedItem,
        setSelectAllItem,
        setFilterData,
    } = useChannelListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/channels', { ...tableData, ...filterData }],
        ([_, params]) => apiGetChannelList(params),
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
