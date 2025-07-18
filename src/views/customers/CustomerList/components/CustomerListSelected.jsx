import React, {useState} from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useCustomerList from '../hooks/useCustomerList'
import {TbChecks} from 'react-icons/tb'
import useTranslation from "@/utils/hooks/useTranslation.js";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
// import MDEditor from '@uiw/react-md-editor';
import {Input} from "@/components/ui/index.js";
import {apiDraftMessage} from "@/services/MessageService.js";
import {useNavigate} from "react-router";


const CustomerListSelected = () => {
    const {
        selectedCustomer,
        customerList,
        mutate,
        customerListTotal,
        selectedAllCustomers,
        setSelectAllCustomer,
    } = useCustomerList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [sendMessageDialogOpen, setSendMessageDialogOpen] = useState(false)
    const [sendMessageLoading, setSendMessageLoading] = useState(false)
    const [content, setContent] = useState('')
    // const [showPicker, setShowPicker] = useState(false);

    const navigate = useNavigate()
    const {t} = useTranslation()

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = () => {
        const newCustomerList = customerList.filter((customer) => {
            return !selectedCustomer.some(
                (selected) => selected.id === customer.id,
            )
        })
        setSelectAllCustomer([])
        mutate(
            {
                list: newCustomerList,
                total: customerListTotal - selectedCustomer.length,
            },
            false,
        )
        setDeleteConfirmationOpen(false)
    }

    const handleSend = async () => {
        setSendMessageLoading(true)

        try {
            const res = await apiDraftMessage({
                message: content,
                selectedAllCustomers: selectedAllCustomers,
            });

            if (res) {
                toast.push(
                    <Notification type="success">{t('Message sent')}</Notification>,
                    {placement: 'top-center'},
                )

                setSendMessageLoading(false)
                setSendMessageDialogOpen(false)
                setSelectAllCustomer([])
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setSendMessageLoading(false)
        }
    }

    const handelSendMessage = async () => {
        try {

            const memberIds = [...new Set(selectedCustomer.map(item => item.member_id))];

            const res = apiDraftMessage({
                memberIds: memberIds,
                allMembers: selectedAllCustomers
            })

            if (res) {
                setSendMessageLoading(false)
                setSelectAllCustomer([])
                navigate('/messages')
            }
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setSendMessageLoading(false)
        }
    }

    // const handleEmojiClick = (emojiData) => {
    //     const emoji = emojiData.emoji;
    //     setContent((prev) => prev + emoji);
    //     setShowPicker(false)
    // };

    return (
        <>
            {selectedCustomer.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedCustomer.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks/>
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedCustomer.length}{' '}
                                                Subscribers
                                            </span>
                                            <span>selected</span>
                                        </span>
                                    </span>
                                )}
                            </span>

                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                    }
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    onClick={handelSendMessage}
                                >
                                    Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove subscribers"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove these subscribers? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
            <Dialog
                isOpen={sendMessageDialogOpen}
                onRequestClose={() => setSendMessageDialogOpen(false)}
                onClose={() => setSendMessageDialogOpen(false)}
                // width={800}
            >
                <h5>{t('Send message to the selected members')}</h5>
                {/*<Avatar.Group*/}
                {/*    chained*/}
                {/*    omittedAvatarTooltip*/}
                {/*    className="mt-4"*/}
                {/*    maxCount={4}*/}
                {/*    omittedAvatarProps={{ size: 30 }}*/}
                {/*>*/}
                {/*    {selectedCustomer.map((customer) => (*/}
                {/*        <Tooltip key={customer.id} title={`${customer.first_name} ${customer.last_name}`}>*/}
                {/*            <Avatar size={30} icon={<FaUser/>} alt="" />*/}
                {/*        </Tooltip>*/}
                {/*    ))}*/}
                {/*</Avatar.Group>*/}
                <div className="my-4 relative">
                    <Input
                        textArea
                        className={'border-gray-200 dark:border-gray-700'}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => setShowPicker(!showPicker)}*/}
                    {/*    className="text-xl"*/}
                    {/*>*/}
                    {/*    😊*/}
                    {/*</button>*/}

                    {/*{showPicker && (*/}
                    {/*    <div className="absolute z-10 top-0">*/}
                    {/*        <EmojiPicker onEmojiClick={handleEmojiClick} />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
                <div className="ltr:justify-end flex items-center gap-2">
                    <Button
                        size="sm"
                        onClick={() => setSendMessageDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        loading={sendMessageLoading}
                        onClick={handleSend}
                    >
                        Send
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default CustomerListSelected
