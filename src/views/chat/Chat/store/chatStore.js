import {create} from 'zustand'

const initialState = {
    conversationRecord: [],
    selectedChat: {},
    content: '',
    mobileSideBarExpand: false,
    chats: [],
    selectedChatType: 'draft',
    chatsFetched: false,
    contactListDialog: false,
    contactInfoDrawer: {},
    templatesDrawer: {},
}

export const useChatStore = create((set, get) => ({
    ...initialState,
    setChats: (payload) => set(() => ({chats: payload})),
    setChatsFetched: (payload) => set(() => ({chatsFetched: payload})),
    setSelectedChat: (payload) => set(() => ({selectedChat: payload})),
    setContactInfoDrawer: (payload) => set(() => ({contactInfoDrawer: payload})),
    setTemplatesDrawer: (payload) => set(() => ({templatesDrawer: payload})),
    setChatMute: ({id, muted}) => set(() => {
        const chats = get().chats.map((chat) => {
            if (chat.id === id) {
                chat.muted = muted
            }
            return chat
        })
        return {chats}
    }),
    setSelectedChatType: (payload) => set(() => ({selectedChatType: payload})),
    setMobileSidebar: (payload) => set(() => ({mobileSideBarExpand: payload})),
    setContent: (payload) => set(() => ({content: payload})),
    deleteConversationRecord: (payload) => set(() => {
        const previousConversationRecord = get().conversationRecord
        const previousChats = get().chats
        return {
            conversationRecord: previousConversationRecord.filter(
                (record) => record.id !== payload,
            ),
            chats: previousChats.filter((chat) => chat.id !== payload),
        }
    }),
}))
