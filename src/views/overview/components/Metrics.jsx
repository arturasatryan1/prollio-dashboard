import Card from '@/components/ui/Card'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import classNames from '@/utils/classNames'
import {NumericFormat} from 'react-number-format'
import {TbCoins} from 'react-icons/tb'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {FaUserFriends} from "react-icons/fa";
import {BsPersonCheck} from "react-icons/bs";

const Widget = ({title, growShrink, value, compareFrom, icon, iconClass}) => {
    return (
        <Card className="flex-1">
            <div className="flex justify-between gap-2 relative">
                <div>
                    <div className="mb-10 text-base">{title}</div>
                    <h3 className="mb-1">{value}</h3>
                    <div className="inline-flex items-center flex-wrap gap-1">
                        <GrowShrinkValue
                            className="font-bold"
                            value={growShrink}
                            suffix="%"
                            positiveIcon="+"
                            negativeIcon=""
                        />
                        <span>{compareFrom}</span>
                    </div>
                </div>
                <div
                    className={classNames(
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 text-gray-900 rounded-full text-2xl',
                        iconClass,
                    )}
                >
                    {icon}
                </div>
            </div>
        </Card>
    )
}

const Metrics = ({data, selectedPeriod}) => {
    const {t} = useTranslation()

    const vsPeriod = {
        weekly: t('vs last week'),
        monthly: t('vs last month'),
        annually: t('vs last year')
    }

    return (
        <div className="flex flex-col 2xl:flex-col xl:flex-row gap-4">
            <Widget
                title={t('Active subscribers')}
                value={
                    <NumericFormat
                        displayType="text"
                        value={data?.active_members}
                        thousandSeparator={true}
                    />
                }
                // growShrink={10}
                compareFrom={vsPeriod[selectedPeriod]}
                icon={<BsPersonCheck/>}
                iconClass="bg-orange-200"
            />
            <Widget
                title={t('Total visitors')}
                value={
                    <NumericFormat
                        displayType="text"
                        value={data?.total_visitors}
                        thousandSeparator={true}
                    />
                }
                // growShrink={0}
                compareFrom={vsPeriod[selectedPeriod]}
                icon={<FaUserFriends/>}
                iconClass="bg-blue-200"
            />
            <Widget
                title={t('Visitors joined')}
                value={`${data?.total_visitors ? Math.round((data?.active_members / data?.total_visitors) * 100, 1) : 0}%`}
                // growShrink={0}
                compareFrom={vsPeriod[selectedPeriod]}
                icon={<BsPersonCheck/>}
                iconClass="bg-emerald-200"
            />
            {/*<Widget*/}
            {/*    title="Ad campaign clicks"*/}
            {/*    value={*/}
            {/*        <NumericFormat*/}
            {/*            displayType="text"*/}
            {/*            value={data.adCampaignClicks.value}*/}
            {/*            thousandSeparator={true}*/}
            {/*        />*/}
            {/*    }*/}
            {/*    growShrink={data.adCampaignClicks.growShrink}*/}
            {/*    compareFrom={vsPeriod[selectedPeriod]}*/}
            {/*    icon={<TbPlus />}*/}
            {/*    iconClass="bg-purple-200"*/}
            {/*/>*/}
        </div>
    )
}

export default Metrics
