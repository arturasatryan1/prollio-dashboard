import {useState} from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import ChannelForm from '../ChannelForm'
import NoUserFound from '@/assets/svg/NoUserFound'
import {TbArrowNarrowLeft, TbTrash} from 'react-icons/tb'
import {useNavigate, useParams} from 'react-router'
import useSWR from 'swr'
import {apiGetChannel, apiUpdateChannel} from "@/services/ChannelService.js";
import {boolean} from "zod";

const ChannelEdit = () => {
    const {id} = useParams()

    const navigate = useNavigate()

    const {data, isLoading} = useSWR(
        [`/api/channels/${id}`, {id: id}],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetChannel(params),
        {
            revalidateOnFocus: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFormSubmit = async (values) => {
        setIsSubmitting(true)

        try {
            const res = await apiUpdateChannel(id, {
                name: values.name,
                description: values.description,
                img: values.img,
                allow_comments: values.allowComment,
                allow_reactions: values.allowReaction,
            });

            toast.push(
                <Notification type="success">Channel saved!</Notification>,
                {placement: 'top-center'},
            )

            navigate('/channels')
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors.message}</Notification>,
                {placement: 'top-center'},
            )
        }

        setIsSubmitting(false)
    }

    const getDefaultValues = () => {
        if (data) {
            const {name, description, image, allow_comment, allow_reaction} = data
            return {
                name: name,
                description: description,
                img: image,
                allowComment: Boolean(allow_comment),
                allowReaction: Boolean(allow_reaction),
            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Customer deleted!</Notification>,
            {placement: 'top-center'},
        )
        navigate('/channels')
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280}/>
                    <h3 className="mt-8">No channel found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <ChannelForm
                        defaultValues={getDefaultValues()}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft/>}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash/>}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </ChannelForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Delete channel"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this channel? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default ChannelEdit
