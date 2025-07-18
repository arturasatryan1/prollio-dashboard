import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {NumericFormat} from "react-number-format";
import Tag from '@/components/ui/Tag'
import dayjs from "dayjs";
import {MdClose} from "react-icons/md";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {Input} from "@/components/ui/index.js";
import {FiCheck, FiCopy} from "react-icons/fi";
import {useState} from "react";

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

const InfoSection = ({data = {}, handleCancel}) => {
    const [copied, setCopied] = useState(false)


    const {t} = useTranslation()


    const handleCopy = () => {
        navigator.clipboard.writeText(data.link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card className="w-full">
            <div className="flex flex-col xl:justify-between h-full mx-auto">
                <span>
                    <Tag className={statusColor[data.status]}>
                        {t(data.status)}
                    </Tag>
                </span>
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <h4 className="font-bold">{data.title}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <CustomerInfoField title={t('Description')} value={data.description}/>
                    {/*<CustomerInfoField title="Subscribers" value={data.subscribers?.length}/>*/}
                    {/*<CustomerInfoField title="Promo Codes" value={data.promo_codes?.length}/>*/}
                    <CustomerInfoField title={t('Created Date')}
                                       value={dayjs(data.created_at).format('DD/MM/YYYY HH:mm')}/>
                    <CustomerInfoField title={t('Start Time')}
                                       value={dayjs(data.start_time).format('DD/MM/YYYY HH:mm')}/>
                    <CustomerInfoField title={t('End Time')} value={dayjs(data.end_time).format('DD/MM/YYYY HH:mm')}/>
                    {
                        data.canceled_at && (
                            <CustomerInfoField title={t('Canceled At')}
                                               value={dayjs(data.canceled_at).format('DD/MM/YYYY HH:mm')}/>
                        )
                    }
                    {
                        data.cancelled_reason && (
                            <CustomerInfoField title={t('Canceled Reason')} value={data.cancelled_reason}/>
                        )
                    }
                    {
                        data.status === 'upcoming' && (
                            <div>
                                <strong>{t('Share Link')}</strong>
                                <div className="mt-1 flex items-center gap-2">
                                    <Input
                                        readOnly
                                        value={data.link}
                                        className=""
                                    />
                                    <Button size="sm" onClick={handleCopy}>
                                        {copied ? <FiCheck size={16}/> : <FiCopy size={16}/>}
                                    </Button>
                                </div>
                                {copied && (
                                    <span className="text-green-600 text-xs mt-1 inline-block">
                                      {t('Copied to clipboard')}
                                    </span>
                                )}
                            </div>
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
                            onClick={handleCancel}
                        >
                            {t('Cancel')}
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default InfoSection
