import {useState} from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {useNavigate} from 'react-router'
import {NumericFormat} from "react-number-format";
import {HiOutlineTrash} from "react-icons/hi";
import Avatar from "@/components/ui/Avatar/Avatar.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";

const CustomerInfoField = ({title, value, decimal = false}) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            {
                decimal ? (<NumericFormat
                    className="heading-text block"
                    displayType="text"
                    value={(Math.round(value * 100) / 100).toFixed(2)}
                    suffix={'֏'}
                    thousandSeparator={true}
                />) : (<p className="heading-text font-bold">{value}</p>)
            }

        </div>
    )
}

const ProfileSection = ({data = {}}) => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleSendMessage = () => {
        navigate('/concepts/chat')
    }

    return (
        <Card className="w-full">
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <Avatar size={90} shape="circle" src={data.image} />
                    <h4 className="font-bold">{data.name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4">
                    <CustomerInfoField title={t('Name')} value={`${data.name}`}/>
                    <CustomerInfoField title={t('Description')} value={data.description}/>
                    <CustomerInfoField title={t('Subscribers Count')} value={data.members_count}/>
                    <CustomerInfoField title={t('Allow Comments')} value={t(data.allow_comment ? 'Yes': 'No')}/>
                    <CustomerInfoField title={t('Allow Reactions')} value={t(data.allow_reaction ? 'Yes': 'No')}/>
                </div>
                <div className="flex flex-col gap-4 mt-10">
                    {/*<Button block variant="solid" onClick={handleSendMessage}>*/}
                    {/*    Send Message*/}
                    {/*</Button>*/}
                    <Button
                        block
                        customColorClass={() =>
                            'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                        }
                        icon={<HiOutlineTrash />}
                        // onClick={handleDialogOpen}
                    >
                        {t('Delete')}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default ProfileSection
