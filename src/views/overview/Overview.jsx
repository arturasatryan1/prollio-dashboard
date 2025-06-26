import {useState} from 'react'
import Loading from '@/components/shared/Loading'
import OverviewHeader from './components/OverviewHeader.jsx'
import Metrics from './components/Metrics'
import OverviewChart from './components/OverviewChart.jsx'
import UpcomingEvents from './components/UpcomingEvents'
import {apiGetOverview} from '@/services/DashboardService'
import useSWR from 'swr'

const data = {
    date: ['Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025'],
    series: [
        {
            name: 'Earnings',
            data: [820, 940, 1020, 880, 1200, 1350, 1250],
        },
        {
            name: 'Net Earnings',
            data: [780, 890, 970, 850, 1150, 1280, 1190],
        },
        {
            name: 'Fees',
            data: [40, 50, 50, 30, 50, 70, 60],
        }
    ],
}
const metricsData = {
    visitors: {
        value: 1820,
        growShrink: 12.5,
    },
    active: {
        value: 89,
        growShrink: 5.3,
    },
    joined: {
        value: 4.7,
        growShrink: -1.5,
    },
}

const Overview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly')

    const { data, isLoading, mutate } = useSWR(
        ['/api/dashboard/overview', {period: selectedPeriod}],
        ([_, params]) => apiGetOverview(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    const handlePeriodChange = (option) => {
        if (option?.value) {
            setSelectedPeriod(option?.value);
            mutate('/api/dashboard/overview')
        }
    }

    return (
        <Loading loading={isLoading}>
            {1 && (
                <div className="flex flex-col gap-4">
                    <OverviewHeader
                        selectedPeriod={selectedPeriod}
                        handlePeriodChange={handlePeriodChange}
                    />
                    <div className="flex flex-col 2xl:grid grid-cols-4 gap-4">
                        <div className="col-span-4 2xl:col-span-3">
                            <OverviewChart
                                data={data}
                            />
                        </div>
                        <div className="2xl:col-span-1">
                            <Metrics
                                data={data?.summary}
                                selectedPeriod={selectedPeriod}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6 xl:col-span-4">
                            <UpcomingEvents/>
                        </div>
                        {/*<div className="col-span-12 md:col-span-6 xl:col-span-4">*/}
                        {/*    <DeviceSession*/}
                        {/*        data={data[selectedPeriod].deviceSession}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-span-12 xl:col-span-4">*/}
                        {/*    <TopChannel*/}
                        {/*        data={topChannelDummyData}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-span-12">*/}
                        {/*    <Traffic data={data[selectedPeriod].traffic} />*/}
                        {/*</div>*/}
                    </div>
                </div>
            )}
        </Loading>
    )
}

export default Overview
