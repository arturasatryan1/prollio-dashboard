import { create } from 'zustand'

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

}

const initialState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedExpert: [],
}

export const useExpertListStore = create((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedExpert: (checked, row) =>
        set((state) => {
            const prevData = state.selectedExpert
            if (checked) {
                return { selectedExpert: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevExpert) => row.id === prevExpert.id)
                ) {
                    return {
                        selectedExpert: prevData.filter(
                            (prevExpert) => prevExpert.id !== row.id,
                        ),
                    }
                }
                return { selectedExpert: prevData }
            }
        }),
    setSelectAllExpert: (row) => set(() => ({ selectedExpert: row })),
}))
