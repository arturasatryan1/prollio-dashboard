import { useState } from 'react'
import Loading from '@/components/shared/Loading'
import OverviewHeader from './components/OverviewHeader.jsx'
import Metrics from './components/Metrics'
import WebAnalytic from './components/OverviewChart.jsx'
import Traffic from './components/Traffic'
import TopChannel from './components/TopChannel'
import DeviceSession from './components/DeviceSession'
import UpcomingEvents from './components/UpcomingEvents'
import { apiGetOverview } from '@/services/DashboardService'
import useSWR from 'swr'
const data = {
    date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
        {
            name: 'Total Earnings',
            data: [120, 200, 150, 300, 250, 400, 350],
        },
        {
            name: 'Payouts',
            data: [80, 180, 130, 280, 230, 370, 330],
        },
        {
            name: 'Fees',
            data: [10, 20, 15, 25, 20, 30, 25],
        },
    ],
}
const metricsData = {
    visitors: {
        value: 1820,
        growShrink: 12.5,
    },
    conversionRate: {
        value: 4.7,
        growShrink: -1.2,
    },
    adCampaignClicks: {
        value: 920,
        growShrink: 5.3,
    },
}
const topEventDummyData = [
    {
        event: 'Summer Wellness Retreat',
        visitors: 320,
        revenue: '$4,800',
    },
    {
        event: 'Evening Yoga Class',
        visitors: 125,
        revenue: '$1,875',
    },
    {
        event: 'Nutrition Workshop',
        visitors: 210,
        revenue: '$3,150',
    }
]
const topChannelDummyData = {
    visitors: 12480,
    channels: [
        {
            id: 1,
            name: 'MindSet Boost',
            percentage: 42.5,
            total: 5300,
            img: 'https://via.placeholder.com/28x28.png?text=M',
        },
        {
            id: 2,
            name: 'Legal Advisor',
            percentage: 27.3,
            total: 3400,
            img: 'https://via.placeholder.com/28x28.png?text=L',
        },
        {
            id: 3,
            name: 'FitLife Daily',
            percentage: 16.9,
            total: 2100,
            img: 'https://via.placeholder.com/28x28.png?text=F',
        },
        {
            id: 4,
            name: 'Parenting Pro',
            percentage: 13.3,
            total: 1680,
            img: 'https://via.placeholder.com/28x28.png?text=P',
        },
    ],
}
const upcomingEventsData = [
    {
        title: "Productivity Masterclass",
        date: "Jun 14, 2025 – 18:00",
    },
    {
        title: "Sleep Science Webinar",
        date: "Jun 20, 2025 – 20:30",
        subscribers: 27,
        revenue: 330
    },
    {
        title: "Sleep Science Webinar",
        date: "Jun 20, 2025 – 20:30",
        subscribers: 27,
        revenue: 380
    }
]



const Overview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('thisMonth')

    const { isLoading } = useSWR(
        ['/api/dashboard/overview'],
        () => apiGetOverview(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {1 && (
                <div className="flex flex-col gap-4">
                    <OverviewHeader
                        selectedPeriod={selectedPeriod}
                        onSelectedPeriodChange={setSelectedPeriod}
                    />
                    <div className="flex flex-col 2xl:grid grid-cols-4 gap-4">
                        <div className="col-span-4 2xl:col-span-3">
                            <WebAnalytic
                                data={data}
                            />
                        </div>
                        <div className="2xl:col-span-1">
                            <Metrics
                                data={metricsData}
                                selectedPeriod={selectedPeriod}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6 xl:col-span-4">
                            <UpcomingEvents
                                data={upcomingEventsData}
                            />
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
