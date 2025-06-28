import {useState} from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ChannelForm from '../ChannelForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {TbTrash} from 'react-icons/tb'
import {useNavigate} from 'react-router'
import {apiCreateChannel} from "@/services/ChannelService.js";
import useTranslation from "@/utils/hooks/useTranslation.js";

const ChannelCreate = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFormSubmit = async (values) => {
        setIsSubmitting(true)

        try {
            const res = await apiCreateChannel({
                name: values.name,
                description: values.description,
                img: values.img,
                allow_comments: values.allowComment,
                allow_reactions: values.allowReaction,
            });

            setIsSubmitting(false)
            toast.push(
                <Notification type="success">Channel created!</Notification>,
                {placement: 'top-center'},
            )
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors.message}</Notification>,
                {placement: 'top-center'},
            )
        }

        navigate('/channels')
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Channel discarded!</Notification>,
            {placement: 'top-center'},
        )
        navigate('/channels')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <ChannelForm
                defaultValues={{
                    name: '',
                    description: '',
                    img: null,
                    allowComment: false,
                    allowReaction: false,
                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash/>}
                                onClick={handleDiscard}
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmitting}
                            >
                                {t('Create')}
                            </Button>
                        </div>
                    </div>
                </Container>
            </ChannelForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ChannelCreate
