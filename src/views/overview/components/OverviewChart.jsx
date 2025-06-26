import {useEffect, useRef} from 'react'
import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import {COLORS} from '@/constants/chart.constant'
import {useThemeStore} from '@/store/themeStore'
import {NumericFormat} from 'react-number-format'
import useTranslation from "@/utils/hooks/useTranslation.js";
import dayjs from "dayjs";

const OverviewChart = ({data}) => {

    const isFirstRender = useRef(true)

    const sideNavCollapse = useThemeStore(
        (state) => state.layout.sideNavCollapse,
    )
    const {t} = useTranslation()


    useEffect(() => {
        if (!sideNavCollapse && isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (!isFirstRender.current) {
            window.dispatchEvent(new Event('resize'))
        }
    }, [sideNavCollapse])

    return (
        <Card className="h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h4></h4>
                <div className="inline-flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded-sm"
                            style={{backgroundColor: COLORS[0]}}
                        />
                        <div>Total Earnings</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded-sm"
                            style={{backgroundColor: COLORS[7]}}
                        />
                        <div>Net Earnings</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded-sm"
                            style={{backgroundColor: COLORS[8]}}
                        />
                        <div>Fees</div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="flex items-center gap-10">
                    <div>
                        <div className="mb-2">
                            <div className="flex items-center gap-1">
                                <span>{t('Total Earned')}</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2">
                            <h3>
                                <NumericFormat
                                    displayType="text"
                                    value={data?.summary?.total_earned}
                                    prefix={'֏'}
                                    thousandSeparator={true}
                                />
                            </h3>
                            {/*<GrowShrinkValue*/}
                            {/*    className="font-bold"*/}
                            {/*    value={'10'}*/}
                            {/*    suffix="%"*/}
                            {/*    positiveIcon="+"*/}
                            {/*    negativeIcon=""*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">{t('Pending Payout')}</div>
                        <div className="flex items-end gap-2">
                            <h3>
                                <NumericFormat
                                    displayType="text"
                                    value={data?.summary?.pending_payout}
                                    prefix={'֏'}
                                    thousandSeparator={true}
                                />
                            </h3>
                        </div>
                    </div>
                    {/*<div>*/}
                    {/*    <div className="mb-2">{t('Next Payout')}</div>*/}
                    {/*    <div className="flex items-end gap-2">*/}
                    {/*        <h3>*/}
                    {/*            {dayjs(data?.summary?.next_payout_date).format('DD MMM YYYY')}*/}
                    {/*        </h3>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="mt-4">
                <Chart
                    type="line"
                    series={data?.series}
                    xAxis={data?.date}
                    height="330px"
                    customOptions={{
                        legend: {show: false},
                        colors: [COLORS[0], COLORS[7], COLORS[8]],
                    }}
                />
            </div>
        </Card>
    )
}

export default OverviewChart
