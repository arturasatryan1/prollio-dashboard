import React, {useState} from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useCustomerList from '../hooks/useCustomerList'
import {TbChecks} from 'react-icons/tb'
import useTranslation from "@/utils/hooks/useTranslation.js";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import {apiBulkRemoveCustomers} from "@/services/CustomerService.js";


const CustomerListSelected = () => {
    const {
        selectedCustomer,
        setSelectedCustomer,
        mutate,
    } = useCustomerList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const {t} = useTranslation()

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        const memberIds = [...new Set(selectedCustomer.map(item => item.id))];

        try {
            const res = await apiBulkRemoveCustomers({memberIds});
            mutate()

            selectedCustomer.map(row => {
                setSelectedCustomer(false, row)
            })

            if (res) {
                toast.push(
                    <Notification type="success">{t('Members Removed Successful')}</Notification>,
                    {placement: 'top-center'},
                )
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{t(errors?.response?.data?.message)}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setDeleteConfirmationOpen(false)
        }
    }

    return (
        <>
            {selectedCustomer.length > 0 && (
                <StickyFooter
                    className="bg-white dark:bg-gray-800 py-4"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-8"
                    defaultClass="rounded-xl border border-gray-200 dark:border-gray-600 mt-4 px-4 sm:px-8"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-0">
                        {/* Selected Members Info */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <TbChecks className="text-lg text-primary" />
                            <span className="font-semibold heading-text">
            {selectedCustomer.length} {t('member')} {t('selected')}
          </span>
                        </div>

                        {/* Action Button */}
                        <div className="flex-shrink-0">
                            <Button
                                size="sm"
                                className="w-full md:w-auto"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                }
                                type="button"
                                onClick={handleDelete}
                            >
                                {t('Remove from channel')}
                            </Button>
                        </div>
                    </div>
                </StickyFooter>
            )}

            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title={t('Remove subscribers')}
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>{t('Are you sure you want to remove these subscribers?')}</p>
            </ConfirmDialog>
        </>
    )
}

export default CustomerListSelected
