import React, {useEffect, useRef, useState} from 'react'
import Badge from '@/components/ui/Badge'
import ScrollBar from '@/components/ui/ScrollBar'
import NewChat from './NewChat'
import {useChatStore} from '../store/chatStore'
import useChat from '../hooks/useChat'
import classNames from '@/utils/classNames'
import useDebounce from '@/utils/hooks/useDebounce'
import {TbSearch, TbTrash, TbX} from 'react-icons/tb'
import dayjs from 'dayjs'
import useTranslation from "@/utils/hooks/useTranslation.js";
import ConfirmDialog from "../../../../components/shared/ConfirmDialog.jsx";
import {apiDeleteMessage} from "@/services/MessageService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import ChatSegment from "../components/ChatSegment.jsx";

const ChatList = () => {
    const messages = useChatStore((state) => state.chats)
    const selectedChat = useChatStore((state) => state.selectedChat)
    const setSelectedChat = useChatStore((state) => state.setSelectedChat)
    const setMobileSidebar = useChatStore((state) => state.setMobileSidebar)
    const selectedChatType = useChatStore((state) => state.selectedChatType)
    const setSelectedChatType = useChatStore((state) => state.setSelectedChatType)

    const {fetchChats} = useChat();

    const {t} = useTranslation()

    const inputRef = useRef(null)

    const [showSearchBar, setShowSearchBar] = useState(false)
    const [queryText, setQueryText] = useState('')
    const [messageDeletionDialogOpen, setMessageDeletionDialogOpen] = useState(false)
    const [selectedMessageForDelete, setSelectedMessageForDelete] = useState(null)

    useEffect(() => {
        fetchChats()
    }, [])


    useEffect(() => {
        setSelectedChat({})
        setSelectedChatType('draft')

        if (messages?.length) {
            const firstDraft = messages.find(message => message.status === 'draft');
            if (firstDraft) {
                setSelectedChat(firstDraft);
            }
        }
    }, [messages])

    useEffect(() => {
        if (showSearchBar) {
            inputRef.current?.focus()
        } else {
            inputRef.current?.blur()
        }
    }, [showSearchBar])

    const handleChatClick = (chat) => {
        setSelectedChat(chat)
        setMobileSidebar(false)
    }

    function handleDebounceFn(e) {
        if (e.target.value.length > 0) {
            setSelectedChatType('')
        }

        if (e.target.value.length === 0) {
            setSelectedChatType('draft')
        }

        setQueryText(e.target.value)
    }

    const debounceFn = useDebounce(handleDebounceFn, 500)

    const handleInputChange = (e) => {
        debounceFn(e)
    }

    const handleConfirmDeleteMessage = async () => {

        try {
            const res = await apiDeleteMessage(selectedMessageForDelete.id)

            if (res) {
                fetchChats()
                setMessageDeletionDialogOpen(false)
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{t(errors?.response?.data?.message) || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        }
    }

    const handleSearchToggleClick = () => {
        setShowSearchBar(!showSearchBar)
    }

    const handleChangeSegment = (value) => {
        setSelectedChatType(value)
    }

    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                    {showSearchBar ? (
                        <input
                            ref={inputRef}
                            className="flex-1 h-full placeholder:text-gray-400 placeholder:text-base placeholder:font-normal bg-transparent focus:outline-hidden heading-text font-bold"
                            placeholder="Search chat"
                            onChange={handleInputChange}
                        />
                    ) : (
                        <h5 className={'truncate'}>{t('Group Messages')}</h5>
                    )}
                    {/*<button*/}
                    {/*    className="close-button text-lg"*/}
                    {/*    type="button"*/}
                    {/*    onClick={handleSearchToggleClick}*/}
                    {/*>*/}
                    {/*    {showSearchBar ? <TbX/> : <TbSearch/>}*/}
                    {/*</button>*/}
                </div>
                <ChatSegment handleChangeSegment={handleChangeSegment}/>
            </div>
            <ScrollBar className=" overflow-y-auto flex-1 overflow-auto">
                <div className="flex flex-col gap-2 h-full">
                    {messages?.filter((item) => {
                        if (queryText) {
                            return item.content
                                .toLowerCase()
                                .includes(queryText)
                        }

                        return selectedChatType === item.status
                    }).map((item) => (
                        <div
                            key={item.id}
                            className={classNames(
                                'py-3 px-2 flex items-center gap-2 justify-between rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 relative cursor-pointer select-none',
                                selectedChat.id === item.id &&
                                'bg-gray-100 dark:bg-gray-700',
                            )}
                            role="button"
                            onClick={() =>
                                handleChatClick(item)
                            }
                        >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="min-w-0 flex-1">
                                    <p className={'mb-1'}>{dayjs(item.created_at).format('MMM D, HH:mm')}</p>
                                    <div className="truncate">
                                        <strong>{item.content}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 items-center">
                                {item.status === 'draft' && (
                                    <Badge className="bg-yellow-300"/>
                                    // <Tag className={'bg-yellow-300'}>Draft</Tag>
                                )}
                            </div>
                            <div
                                className="flex gap-1 items-center p-2 text-error rounded-xl hover:bg-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedMessageForDelete(item)
                                    setMessageDeletionDialogOpen(true)
                                }}
                            >
                                <TbTrash size={16}/>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollBar>
            <NewChat onClose={() => {
                fetchChats();
                setSelectedChatType('draft')
            }}/>
            <ConfirmDialog
                isOpen={messageDeletionDialogOpen}
                type="danger"
                title={t('Delete Message')}
                onClose={() => setMessageDeletionDialogOpen(false)}
                onRequestClose={() => setMessageDeletionDialogOpen(false)}
                onCancel={() => setMessageDeletionDialogOpen(false)}
                onConfirm={handleConfirmDeleteMessage}
            >
                <p>
                    {t('Are you sure you want to delete?')}
                </p>
            </ConfirmDialog>
        </div>
    )
}

export default ChatList
