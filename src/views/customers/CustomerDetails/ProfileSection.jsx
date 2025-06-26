import {useState} from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {useNavigate} from 'react-router'
import {NumericFormat} from "react-number-format";

const CustomerInfoField = ({title, value, decimal = false}) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            {
                decimal ? (<NumericFormat
                    className="heading-text block"
                    displayType="text"
                    value={(Math.round(value * 100) / 100).toFixed(2)}
                    prefix={'֏'}
                    thousandSeparator={true}
                />) : (<p className="heading-text font-bold">{value}</p>)
            }

        </div>
    )
}

const ProfileSection = ({data = {}}) => {
    const navigate = useNavigate()
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
                    <h4 className="font-bold">{data.name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4">
                    <CustomerInfoField title="Full Name" value={`${data.first_name} ${data.last_name}`}/>
                    <CustomerInfoField title="Email" value={data.email}/>
                    <CustomerInfoField title="Username" value={data.username}/>
                    <CustomerInfoField title="Total Spent" value={data.spent} decimal={true}/>
                </div>
                <div className="flex flex-col gap-4 mt-10">
                    {/*<Button block variant="solid" onClick={handleSendMessage}>*/}
                    {/*    Send Message*/}
                    {/*</Button>*/}
                    {/*<Button*/}
                    {/*    block*/}
                    {/*    customColorClass={() =>*/}
                    {/*        'text-error hover:border-error hover:ring-1 ring-error hover:text-error'*/}
                    {/*    }*/}
                    {/*    icon={<HiOutlineTrash />}*/}
                    {/*    onClick={handleDialogOpen}*/}
                    {/*>*/}
                    {/*    Delete*/}
                    {/*</Button>*/}
                </div>
            </div>
        </Card>
    )
}

export default ProfileSection
