import { create } from 'zustand'

const initialState = {
    toolPaymentDialog: false,
    toolInfoDialog: false,
    selectedTool: {},
}

export const useToolStore = create((set) => ({
    ...initialState,
    setToolPaymentDialog: (payload) => set(() => ({ toolPaymentDialog: payload })),
    setToolInfoDialog: (payload) => set(() => ({ toolInfoDialog: payload })),
    setSelectedTool: (payload) => set(() => ({ selectedTool: payload })),
}))
