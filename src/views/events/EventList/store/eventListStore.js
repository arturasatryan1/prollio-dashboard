import {create} from 'zustand'
import dayjs from "dayjs";

export const initialTableData = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    channel: null,
    dateRange: null,
    status: null,
}

const initialState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedItem: [],
}

export const useEventListStore = create((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({filterData: payload})),
    setTableData: (payload) => set(() => ({tableData: payload})),
    setSelectedItem: (checked, row) => set((state) => {
        const prevData = state.selectedItem
        if (checked) {
            return {selectedItem: [...prevData, ...[row]]}
        } else {
            if (
                prevData.some((prevItem) => row.id === prevItem.id)
            ) {
                return {
                    selectedItem: prevData.filter(
                        (prevItem) => prevItem.id !== row.id,
                    ),
                }
            }
            return {selectedItem: prevData}
        }
    }),
    setSelectAllItem: (row) => set(() => ({selectedItem: row})),
}))
