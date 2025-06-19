import {useState} from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {FaFacebookF, FaLinkedinIn,} from 'react-icons/fa6'
import {useNavigate} from 'react-router'
import {FaInstagram, FaTiktok} from "react-icons/fa";
import Tag from "@/components/ui/Tag/index.jsx";
import dayjs from "dayjs";
import {apiApproveRequest, apiRejectRequest} from "@/services/RequestService.js";

const statusColor = {
    pending: 'bg-amber-200 dark:bg-amber-300 text-gray-900 dark:text-gray-900',
    approved: 'bg-green-200 dark:bg-green-300 text-gray-900 dark:text-gray-900',
    rejected: 'bg-red-200 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const CustomerInfoField = ({title, value}) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const ProfileSection = ({data = {}}) => {
    const navigate = useNavigate()

    const [rejectConfirmationOpen, setRejectConfirmationOpen] = useState(false)
    const [approveConfirmationOpen, setApproveConfirmationOpen] = useState(false)

    const handleSocialNavigate = (link = '') => {
        window.open(`https://${link}`, '_blank', 'rel=noopener noreferrer')
    }

    const handleDelete = () => {
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                Expert deleted successful
            </Notification>,
        )
    }
    const handleConfirmReject = async () => {

        try {
            navigate('/requests')

            const resp = await apiRejectRequest({id: data.id})

            toast.push(
                <Notification type="success">{resp?.message}</Notification>,
                {placement: 'top-center'},
            )
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors.response?.data?.message}</Notification>,
                {placement: 'top-center'},
            )
        }

        setRejectConfirmationOpen(false)
    }
    const handleConfirmApprove = async () => {
        try {
            navigate('/requests')

            const resp = await apiApproveRequest({id: data.id})

            toast.push(
                <Notification type="success">{resp?.message}</Notification>,
                {placement: 'top-center'},
            )
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors.response?.data?.message}</Notification>,
                {placement: 'top-center'},
            )
        }

        setApproveConfirmationOpen(false)
    }

    return (
        <Card className="w-full">
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <h4 className="font-bold">{data.first_name} {data.last_name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <CustomerInfoField title="Email" value={data.email}/>
                    <CustomerInfoField title="Phone" value={data.phone}/>
                    <CustomerInfoField title="Request Date" value={dayjs(data.created_at).format('DD/MM/YYYY HH:mm')}/>

                    <div className="mb-7">
                        <span>Social</span>
                        <div className="flex mt-4 gap-2">
                            <Button
                                size="sm"
                                icon={
                                    <FaFacebookF className="text-[#2259f2]"/>
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
                                    <FaInstagram className="text-[#df0018]"/>
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
                                    <FaLinkedinIn className="text-[#155fb8]"/>
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
                                    <FaTiktok className="text-[#df0018]"/>
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

                {data.status === 'pending' ? (
                    <div className="flex flex-col gap-3">
                        <Button
                            size="sm"
                            variant="solid"
                            onClick={() => setApproveConfirmationOpen(true)}
                        >
                            Approve
                        </Button>
                        <Button
                            size="sm"
                            type="button"
                            customColorClass={() =>
                                'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                            }
                            onClick={() => setRejectConfirmationOpen(true)}
                        >
                            Reject
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <span className="mr-2">Status: </span>
                        <Tag className={statusColor[data.status]}>
                            <span className="capitalize">{data.status}</span>
                        </Tag>
                    </div>
                )}

                <ConfirmDialog
                    isOpen={rejectConfirmationOpen}
                    type="danger"
                    title="Reject Requests"
                    onClose={() => setRejectConfirmationOpen(false)}
                    onRequestClose={() => setRejectConfirmationOpen(false)}
                    onCancel={() => setRejectConfirmationOpen(false)}
                    onConfirm={handleConfirmReject}
                >
                    <p>
                        Are you sure you want to reject this request?
                    </p>
                </ConfirmDialog>
                <ConfirmDialog
                    isOpen={approveConfirmationOpen}
                    type="info"
                    title="Approve Requests"
                    onClose={() => setApproveConfirmationOpen(false)}
                    onRequestClose={() => setApproveConfirmationOpen(false)}
                    onCancel={() => setApproveConfirmationOpen(false)}
                    onConfirm={handleConfirmApprove}
                >
                    <p>
                        Are you sure you want to approve this request?
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

export default ProfileSection
