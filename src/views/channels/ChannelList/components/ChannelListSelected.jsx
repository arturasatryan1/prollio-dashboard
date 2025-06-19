import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import RichTextEditor from '@/components/shared/RichTextEditor'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useChannelList from '../hooks/useChannelList.js'
import { TbChecks } from 'react-icons/tb'

const RequestListSelected = () => {
    const {
        selectedItem,
        itemList,
        mutate,
        itemListTotal,
        setSelectAllItem,
    } = useChannelList()

    const [rejectConfirmationOpen, setRejectConfirmationOpen] = useState(false)
    const [approveConfirmationOpen, setApproveConfirmationOpen] = useState(false)

    const handleConfirmReject = () => {
        // const newItemList = itemList.filter((item) => {
        //     return !selectedItem.some(
        //         (selected) => selected.id === item.id,
        //     )
        // })
        // setSelectAllItem([])
        // mutate(
        //     {
        //         list: newItemList,
        //         total: itemListTotal - selectedItem.length,
        //     },
        //     false,
        // )
        setRejectConfirmationOpen(false)
    }
    const handleConfirmApprove = () => {
        // const newItemList = itemList.filter((item) => {
        //     return !selectedItem.some(
        //         (selected) => selected.id === item.id,
        //     )
        // })
        // setSelectAllItem([])
        // mutate(
        //     {
        //         list: newItemList,
        //         total: itemListTotal - selectedItem.length,
        //     },
        //     false,
        // )
        setApproveConfirmationOpen(false)
    }

    return (
        <>
            {selectedItem.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedItem.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedItem.length}{' '}
                                                Requests
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
                                    onClick={() => setRejectConfirmationOpen(true)}
                                >
                                    Reject
                                </Button>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    onClick={() => setApproveConfirmationOpen(true)}
                                >
                                    Approve
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}
        </>
    )
}

export default RequestListSelected
