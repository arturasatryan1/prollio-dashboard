import React, {useEffect, useRef, useState} from 'react'
import Card from '@/components/ui/Card'
import StartConversation from '@/assets/svg/StartConversation'
import {useChatStore} from '../store/chatStore'
// import { apiGetConversation } from '@/services/ChatService'
import classNames from '@/utils/classNames'
import useResponsive from '@/utils/hooks/useResponsive'
import dayjs from 'dayjs'
import {TbChevronLeft, TbUsers} from 'react-icons/tb'
import * as commands from "@uiw/react-md-editor/commands"
import { createRoot } from 'react-dom/client';

import MDEditor from "@uiw/react-md-editor";
import useTranslation from "@/utils/hooks/useTranslation";
import EmojiPicker from "emoji-picker-react";
import {Button, Checkbox, FormItem} from "@/components/ui/index.js";
import {FaUsers} from "react-icons/fa";
import Input from "@/components/ui/Input/index.jsx";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import {apiSendMessage} from "@/services/MessageService.js";
import useChat from "@/views/chat/Chat/hooks/useChat.js";
import { emoji } from './EmojiCommand';
const ChatBody = () => {
    const selectedChat = useChatStore((state) => state.selectedChat)
    const content = useChatStore((state) => state.content)
    const setContent = useChatStore((state) => state.setContent)
    const setSelectedChat = useChatStore((state) => state.setSelectedChat)
    const setContactInfoDrawer = useChatStore((state) => state.setContactInfoDrawer)
    const setTemplatesDrawer = useChatStore((state) => state.setTemplatesDrawer)

    const {fetchChats} = useChat();

    const {smaller} = useResponsive()
    const [templateName, setTemplateNme] = useState('')
    const [isSaveAsTemplateChecked, setIsSaveAsTemplateChecked] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {t} = useTranslation()

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const editorRef = useRef(null);

    const insertEmoji = (emoji) => {

        const textarea = editorRef.current?.querySelector('.w-md-editor-text-input');

        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const before = textarea.value.slice(0, start);
        const after = textarea.value.slice(end);

        const newContent = before + emoji + after;
        setContent(newContent);

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        }, 0);
    };

    const handleGroupInfoClick = () => {
        setContactInfoDrawer({
            open: true,
            ...selectedChat
        })
    }

    const handleShowTemplates = () => {
        setTemplatesDrawer({
            open: true
        })
    }
    const handleSubmitMessage = async () => {

        if (isSaveAsTemplateChecked && !templateName) {
            return;
        }

        setIsSubmitting(true)

        try {
            const resp = await apiSendMessage(selectedChat.id, {
                messageContent: content,
                templateName: templateName
            })

            if (resp) {
                setTemplateNme('')
                setIsSaveAsTemplateChecked(false)
                fetchChats()

                toast.push(
                    <Notification type="success">{t('Message Successfully Sent')}</Notification>,
                    {placement: 'top-center'},
                )
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{t(errors?.response?.data?.message) || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const cardHeaderProps = {
        header: {
            content: (
                <div className="flex items-center justify-between gap-2">
                    {smaller.md && (
                        <button
                            className="text-xl hover:text-primary"
                            onClick={() => setSelectedChat({})}
                        >
                            <TbChevronLeft/>
                        </button>
                    )}
                    <div className="min-w-0 flex-1">
                        <Button
                            variant="plain"
                            size={'xs'}
                            className="heading-text flex gap-2 items-center"
                            onClick={handleGroupInfoClick}
                        >
                            <TbUsers size={20}/> <span>{selectedChat.messages_count}</span>
                        </Button>
                    </div>

                    <Button
                        variant="plain"
                        type="button"
                        size={'xs'}
                        onClick={handleShowTemplates}
                    >
                        {t('Templates')}
                    </Button>

                </div>
            ),
            className: 'bg-gray-100 dark:bg-gray-600',
        },
    }

    useEffect(() => {
        setContent(selectedChat.content)
        setIsSaveAsTemplateChecked(false)
    }, [selectedChat.id])

    return (
        <div
            className={classNames('w-full md:block', !selectedChat.id && 'hidden')}
            ref={editorRef}
        >
            {selectedChat.id ? (
                <Card
                    className="flex-1 h-full max-h-full dark:border-gray-700 border-0"
                    bodyClass="h-[calc(100%-118px)] relative p-0"
                    {...cardHeaderProps}
                >
                    <MDEditor
                        textareaProps={{
                            disabled: selectedChat.status !== 'draft',
                        }}
                        hideToolbar={selectedChat.status !== 'draft'}
                        value={content}
                        onChange={setContent}
                        height={'100%'}
                        commands={[
                            commands.bold,
                            commands.italic,
                            commands.code,
                            commands.codeBlock,
                            commands.link,
                            commands.image,
                            {
                                ...emoji,
                                insertEmoji
                            }
                        ]}
                        // components={{
                        //     textarea: (props) => (
                        //         <Input
                        //             textArea
                        //             {...props}
                        //             className="custom-textarea"
                        //         />
                        //     )
                        // }}
                        autoFocus={true}
                        autoFocusEnd={true}
                        visibleDragbar={false}
                        fullscreen={false}
                        preview="live"
                    />
                    {selectedChat.status === 'draft' && (
                        <div className={"flex justify-between p-3 gap-4"}>
                            <div className={'flex'}>
                                <Checkbox
                                    className={"md:mr-4"}
                                    checked={isSaveAsTemplateChecked}
                                    onChange={(_, e) => {
                                        const defaultName = content
                                            .replace(/[*_#`~]/g, '')
                                            .replace(/[^\w\s]/g, '')
                                            .trim()
                                            .split(/\s+/)
                                            .slice(0, 5)
                                            .join(' ') + '...';

                                        setTemplateNme(defaultName || '')
                                        setIsSaveAsTemplateChecked(e.target.checked)
                                    }}
                                >
                                    <span className={''}>{t('Save as Template')}</span>
                                </Checkbox>
                                {isSaveAsTemplateChecked && (
                                    <FormItem
                                        invalid={isSaveAsTemplateChecked && !templateName}
                                        className={"w-full md:w-80 m-0"}
                                    >
                                        <Input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Template Name"
                                            defaultValue={templateName}
                                        />
                                    </FormItem>
                                )}

                            </div>
                            <Button
                                loading={isSubmitting}
                                variant="solid"
                                type="button"
                                onClick={handleSubmitMessage}
                            >{(t('Send Message'))}</Button>
                        </div>
                    )}
                </Card>
            ) : (
                <div
                    className="flex-1 h-full max-h-full flex flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-800">
                    <StartConversation height={250} width={250}/>
                    {/*<div className="mt-10 text-center">*/}
                    {/*    <h3>{t('No Message Selected')}</h3>*/}
                    {/*    <p className="mt-2 text-base">*/}
                    {/*        Pick a Conversation or Begin a New One*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            )}
        </div>
    )
}

export default ChatBody
