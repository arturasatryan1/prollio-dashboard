import {TbCalendarEvent, TbClockHour4, TbCurrencyDollar, TbTag} from 'react-icons/tb'
import IconText from '@/components/shared/IconText'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {ScrollBar} from "@/components/ui/index.js";
import dayjs from "dayjs";

const EventPreview = ({event, channels}) => {

    const {t} = useTranslation()

    const channelName = channels?.find(c => c.value === event.channel)?.label || event.channel;

    return (
        <div className={"mt-5"}>
            <ScrollBar className=" max-h-[500px] overflow-y-auto">
                <IconText className="mb-4" icon={<TbCalendarEvent className="text-xl "/>}>
                    <span><strong>{t('Title')}:</strong> {event.title}</span>
                </IconText>

                <IconText className="mb-4" icon={<TbClockHour4 className="text-xl "/>}>
                <span>
                    <strong>{t('Start')}:</strong> {dayjs(event.start).format('MMM D, YYYY, HH:mm')}<br/>
                    <strong>{t('End')}:</strong> {dayjs(event.end).format('MMM D, YYYY, HH:mm')}
                </span>
                </IconText>

                <IconText className="mb-4" icon={<TbCurrencyDollar className="text-xl "/>}>
                    <span><strong>{t('Price')}:</strong> {event.price} ֏</span>
                </IconText>
                <IconText className="mb-4" icon={<TbTag className="text-xl "/>}>
                    <span><strong>{t('Channel')}:</strong> {channelName}</span>
                </IconText>

                <IconText className="mb-4">
                    <span><strong>{t('Description')}:</strong> {event.description || '—'}</span>
                </IconText>

                {event.promoCodes && event.promoCodes.length > 0 && (
                    <>
                        <hr className="my-5"/>
                        <h6 className="mb-4 font-bold">{t('Promo Codes')}</h6>
                        <div className="space-y-3">
                            {event.promoCodes.map((code, idx) => (
                                <div key={idx} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                                    <div><strong>{t('Code')}:</strong> {code.code}</div>
                                    <div>
                                        <strong>{t('Type')}:</strong> {code.discountType === 'percent' ? t('Percentage') : t('Fixed Amount')}
                                    </div>
                                    <div><strong>{t('Value')}:</strong> {code.discountValue}</div>
                                    <div><strong>{t('Max Usage')}:</strong> {code.maxUsage}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </ScrollBar>
        </div>
    )
}

export default EventPreview
