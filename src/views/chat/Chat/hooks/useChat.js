import { useChatStore } from '../store/chatStore'
import { apiGetMessageList } from '@/services/MessageService.js'
import useSWRMutation from 'swr/mutation'

async function getChats() {
    return await apiGetMessageList()
}

const useChat = () => {
    const setChats = useChatStore((state) => state.setChats)
    const setChatsFetched = useChatStore((state) => state.setChatsFetched)

    const { trigger: fetchChats, isMutating: isChatsFetching } = useSWRMutation(
        `/api/chats/`,
        getChats,
        {
            onSuccess: (list) => {
                setChats(list)
                setChatsFetched(true)
            },
        },
    )

    return {
        fetchChats,
        isChatsFetching,
    }
}

export default useChat
