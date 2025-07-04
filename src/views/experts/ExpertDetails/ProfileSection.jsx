import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/Avatar'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import dayjs from 'dayjs'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import {
    FaXTwitter,
    FaFacebookF,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa6'
import { useNavigate } from 'react-router'
import {FaInstagram, FaTiktok} from "react-icons/fa";

const CustomerInfoField = ({ title, value }) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const ProfileSection = ({ data = {} }) => {
    const navigate = useNavigate()

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSocialNavigate = (link = '') => {
        window.open(`https://${link}`, '_blank', 'rel=noopener noreferrer')
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDelete = () => {
        setDialogOpen(false)
        navigate('/experts/list')
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                Expert deleted successful
            </Notification>,
        )
    }

    return (
        <Card className="w-full">
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <Avatar size={90} shape="circle" src={data.user.avatar} />
                    <h4 className="font-bold">{data.user.first_name} {data.user.last_name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <CustomerInfoField title="Email" value={data.user.email} />
                    <CustomerInfoField
                        title="Phone"
                        value={data.user?.phone}
                    />
                    <CustomerInfoField
                        title="Joined At"
                        value={dayjs(data.created_at).format('DD MMM YYYY hh:mm A')}
                    />
                    {data.user?.last_login_at && (
                        <CustomerInfoField
                            title="Last Online"
                            value={dayjs(data.user?.last_login_at)
                                .format('DD MMM YYYY hh:mm A')}
                        />
                    ) }
                    <div className="mb-7">
                        <span>Social</span>
                        <div className="flex mt-4 gap-2">
                            <Button
                                size="sm"
                                icon={
                                    <FaFacebookF className="text-[#2259f2]" />
                                }
                                onClick={() =>
                                    handleSocialNavigate(
                                        data?.facebook_url,
                                    )
                                }
                            />
                            <Button
                                size="sm"
                                icon={
                                    <FaInstagram className="text-[#df0018]" />
                                }
                                onClick={() =>
                                    handleSocialNavigate(
                                        data?.instagram_url,
                                    )
                                }
                            />
                            <Button
                                size="sm"
                                icon={
                                    <FaLinkedinIn className="text-[#155fb8]" />
                                }
                                onClick={() =>
                                    handleSocialNavigate(
                                        data?.linkedin_url,
                                    )
                                }
                            />
                            <Button
                                size="sm"
                                icon={
                                    <FaTiktok className="text-[#df0018]" />
                                }
                                onClick={() =>
                                    handleSocialNavigate(
                                        data?.tiktok_url,
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {/*<Button block variant="solid" onClick={handleSendMessage}>*/}
                    {/*    Send Messsage*/}
                    {/*</Button>*/}
                    <Button
                        block
                        customColorClass={() =>
                            'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                        }
                        icon={<HiOutlineTrash />}
                        onClick={handleDialogOpen}
                    >
                        Delete
                    </Button>
                </div>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete expert"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDelete}
                >
                    <p>
                        Are you sure you want to delete this expert? All
                        record related to this customer will be deleted as well.
                        This action cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

export default ProfileSection
