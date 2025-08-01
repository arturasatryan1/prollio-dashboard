import {
    HiCheckCircle,
    HiOutlineInformationCircle,
    HiOutlineExclamation,
    HiOutlineExclamationCircle,
} from 'react-icons/hi'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import useTranslation from "@/utils/hooks/useTranslation.js";

const StatusIcon = ({ status }) => {
    switch (status) {
        case 'info':
            return (
                <Avatar
                    className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiOutlineInformationCircle />
                    </span>
                </Avatar>
            )
        case 'success':
            return (
                <Avatar
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiCheckCircle />
                    </span>
                </Avatar>
            )
        case 'warning':
            return (
                <Avatar
                    className="text-amber-600 bg-amber-100 dark:text-amber-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiOutlineExclamationCircle />
                    </span>
                </Avatar>
            )
        case 'danger':
            return (
                <Avatar
                    className="text-red-600 bg-red-100 dark:text-red-100"
                    shape="circle"
                >
                    <span className="text-2xl">
                        <HiOutlineExclamation />
                    </span>
                </Avatar>
            )

        default:
            return null
    }
}

const ConfirmDialog = (props) => {
    const {
        type = 'info',
        title,
        children,
        onCancel,
        onConfirm,
        cancelText = 'Cancel',
        confirmText = 'Confirm',
        statusIcon = true,
        confirmButtonProps,
        cancelButtonProps,
        ...rest
    } = props

    const {t} = useTranslation()

    const handleCancel = () => {
        onCancel?.()
    }

    const handleConfirm = () => {
        onConfirm?.()
    }

    return (
        <Dialog contentClassName="pb-0 px-0" {...rest}>
            <div className="px-6 pb-6 pt-2 flex">
                {statusIcon && (
                    <div>
                        <StatusIcon status={type} />
                    </div>
                )}

                <div className="ml-4 rtl:mr-4 mr-4 rtl:ml-4 flex-1">
                    <h5 className="mb-2">{title}</h5>
                    {children}
                </div>
            </div>
            <div className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-2xl rounded-br-2xl">
                <div className="flex justify-end items-center gap-2">
                    <Button
                        size="sm"
                        onClick={handleCancel}
                        {...cancelButtonProps}
                    >
                        {t(cancelText)}
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={handleConfirm}
                        {...confirmButtonProps}
                    >
                        {t(confirmText)}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ConfirmDialog
