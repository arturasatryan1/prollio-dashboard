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

export const initialFilterData = {}

const initialState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    // selectedCustomer: [],
}

export const useSubscriberListStore = create((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    // setSelectedCustomer: (checked, row) =>
    //     set((state) => {
    //         const prevData = state.selectedCustomer
    //         if (checked) {
    //             return { selectedCustomer: [...prevData, ...[row]] }
    //         } else {
    //             if (
    //                 prevData.some((prevCustomer) => row.id === prevCustomer.id)
    //             ) {
    //                 return {
    //                     selectedCustomer: prevData.filter(
    //                         (prevCustomer) => prevCustomer.id !== row.id,
    //                     ),
    //                 }
    //             }
    //             return { selectedCustomer: prevData }
    //         }
    //     }),
    // setSelectAllCustomer: (row) => set(() => ({ selectedCustomer: row })),
}))
