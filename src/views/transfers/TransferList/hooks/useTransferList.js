import {apiGetTransferList} from '@/services/TransferService.js'
import useSWR from 'swr'
import {useTransferListStore} from '../store/transferListStore.js'

export default function useTransferList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedItem,
        setSelectedItem,
        setSelectAllItem,
        setFilterData,
    } = useTransferListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/transfers', { ...tableData, ...filterData }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetTransferList(params),
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
