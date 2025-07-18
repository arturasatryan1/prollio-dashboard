import React, {useState} from 'react'
import Drawer from '@/components/ui/Drawer'
import ScrollBar from '@/components/ui/ScrollBar'
import Tabs from '@/components/ui/Tabs'
import {useChatStore} from '../store/chatStore'
import isEmpty from 'lodash/isEmpty'
import {apiDeleteTemplates, apiGetMessageTemplates} from "@/services/MessageService.js";
import useSWR from "swr";
import dayjs from "dayjs";
import useTranslation from "@/utils/hooks/useTranslation.js";
import isLastChild from "@/utils/isLastChild.js";
import {Spinner} from "@/components/ui/index.js";
import classNames from "@/utils/classNames.js";

import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import ConfirmDialog from "../../../../components/shared/ConfirmDialog.jsx";
import {TbTrash} from "react-icons/tb";

const TemplateDrawer = () => {
    const templatesDrawer = useChatStore((state) => state.templatesDrawer)
    const setTemplatesDrawer = useChatStore((state) => state.setTemplatesDrawer)
    const setContent = useChatStore((state) => state.setContent)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [selectedTemplateId, setSelectedTemplateId] = useState(null)

    const {t} = useTranslation();

    const {data: templates, isLoading, mutate} = useSWR(
        templatesDrawer?.open
            ? [`/api/dashboard/message-templates`]
            : null,
        ([_]) => apiGetMessageTemplates(),
        {
            revalidateOnFocus: false,
        }
    );

    const handleDrawerClose = () => {
        setTemplatesDrawer({
            open: false,
        })
    }

    const handleRemoveTemplate = () => {

        if (!selectedTemplateId) {
            return
        }

        try {
            const res = apiDeleteTemplates(selectedTemplateId);

            if (res) {
                setConfirmDialogOpen(false)
                setSelectedTemplateId(false)
                mutate()
            }
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            // mutate()
        }
    }

    return (
        <Drawer
            title={t('Templates')}
            closable={true}
            isOpen={templatesDrawer.open}
            showBackdrop={false}
            width={400}
            onClose={handleDrawerClose}
            onRequestClose={handleDrawerClose}
        >
            {!isEmpty(templates) && (
                <ScrollBar className="h-[calc(100%-30px)]">
                    {templates?.map((item, idx) => (
                        <div
                            key={item.id}
                            role="button"
                            onClick={() => setContent(item.content)}
                        >
                            <div
                                className={`relative rounded-xl flex px-4 py-2 cursor-pointer hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-700`}
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="truncate">
                                        <strong>{item.name}</strong>
                                        <p className={'mb-1'}>{t('Created Date')}: {' '}{dayjs(item.created_at).format('MMM D, HH:mm')}</p>
                                    </div>
                                </div>

                                <div
                                    className="flex gap-1 items-center p-1 text-error"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedTemplateId(item.id)
                                        setConfirmDialogOpen(true)
                                    }}
                                >
                                    <TbTrash size={16}/>
                                </div>

                            </div>
                            {!isLastChild(templates, idx) ? (
                                <div className="border-b border-gray-200 dark:border-gray-700 my-2"/>
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                </ScrollBar>
            )}

            {isLoading && (
                <div className={classNames('flex items-center justify-center')}>
                    <Spinner size={40}/>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmDialogOpen}
                type="danger"
                title={t('Delete Template')}
                onClose={() => setConfirmDialogOpen(false)}
                onRequestClose={() => setConfirmDialogOpen(false)}
                onCancel={() => setConfirmDialogOpen(false)}
                onConfirm={handleRemoveTemplate}
            >
                <p>
                    {t('Are you sure you want to delete?')}
                </p>
            </ConfirmDialog>
        </Drawer>
    )
}

export default TemplateDrawer
