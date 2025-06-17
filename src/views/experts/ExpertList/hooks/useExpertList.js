import { apiGetExpertsList } from '@/services/ExpertService.js'
import useSWR from 'swr'
import { useExpertListStore } from '../store/expertListStore.js'

export default function useExpertList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedExpert,
        setSelectedExpert,
        setSelectAllExpert,
        setFilterData,
    } = useExpertListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/dashboard/experts', { ...tableData, ...filterData }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetExpertsList(params),
        {
            revalidateOnFocus: false,
        },
    )

    const expertList = data?.data || []

    const expertListTotal = data?.total || 0

    return {
        expertList,
        expertListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedExpert,
        setSelectedExpert,
        setSelectAllExpert,
        setFilterData,
    }
}
