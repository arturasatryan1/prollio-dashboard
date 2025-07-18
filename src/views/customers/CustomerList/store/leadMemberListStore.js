import {create} from 'zustand'

export const initialTableData = {
    pageIndex: 1,
    pageSize: 10,
    query: ''
}

export const initialFilterData = {
    event: null,
    status: [],
    dateRange: null
}

const initialState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedLeadMembers: []
}

export const useLeadMembersListStore = create((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({filterData: payload})),
    setTableData: (payload) => set(() => ({tableData: payload})),
    setSelectedLeadMembers: (checked, row) => set((state) => {
        const prevData = state.selectedLeadMembers
        if (checked) {
            return {
                selectedLeadMembers: [...prevData, ...[row]],
            }
        } else {
            if (prevData.some((prevMember) => row.id === prevMember.id)) {
                return {
                    selectedLeadMembers: prevData.filter(
                        (prevMember) => prevMember.id !== row.id,
                    ),
                }
            }
            return {
                selectedLeadMembers: prevData,
            }
        }
    }),
}))
