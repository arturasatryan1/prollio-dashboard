import {useState} from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {useNavigate} from 'react-router'
import {NumericFormat} from "react-number-format";
import {HiOutlineTrash} from "react-icons/hi";
import Tag from '@/components/ui/Tag'
import dayjs from "dayjs";
import {MdClose} from "react-icons/md";

const statusColor = {
    upcoming: 'bg-blue-200 dark:bg-blue-300 text-gray-900 dark:text-gray-900',
    ongoing: 'bg-green-200 dark:bg-green-300 text-gray-900 dark:text-gray-900',
    finished: 'bg-gray-200 dark:bg-gray-300 text-gray-900 dark:text-gray-900',
    cancelled: 'bg-red-200 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}
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

const InfoSection = ({data = {}}) => {
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
            <div className="flex flex-col xl:justify-between h-full mx-auto">
                <span>
                    <Tag className={statusColor[data.status]}>
                        {data.status}
                    </Tag>
                </span>
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <h4 className="font-bold">{data.title}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <CustomerInfoField title="Description" value={data.description}/>
                    {/*<CustomerInfoField title="Subscribers" value={data.subscribers?.length}/>*/}
                    {/*<CustomerInfoField title="Promo Codes" value={data.promo_codes?.length}/>*/}
                    <CustomerInfoField title="Created Date" value={dayjs(data.created_at).format('DD/MM/YYYY HH:mm')}/>
                    <CustomerInfoField title="Start Time" value={dayjs(data.start_time).format('DD/MM/YYYY HH:mm')}/>
                    <CustomerInfoField title="End Time" value={dayjs(data.end_time).format('DD/MM/YYYY HH:mm')}/>
                    {
                        data.canceled_at && (
                            <CustomerInfoField title="Canceled At" value={dayjs(data.canceled_at).format('DD/MM/YYYY HH:mm')}/>
                        )
                    }
                    {
                        data.cancelled_reason && (
                            <CustomerInfoField title="Canceled At" value={data.cancelled_reason}/>
                        )
                    }
                    {
                        data.status === 'upcoming' && (
                            <CustomerInfoField title="Shere Link" value={data.link}/>

                        )
                    }
                </div>
                {data.status === 'upcoming' && (
                    <div className="flex flex-col gap-4 mt-10">
                        <Button
                            block
                            customColorClass={() =>
                                'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                            }
                            icon={<MdClose/>}
                            // onClick={handleDialogOpen}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default InfoSection
