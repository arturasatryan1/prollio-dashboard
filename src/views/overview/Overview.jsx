import {useState} from 'react'
import Loading from '@/components/shared/Loading'
import OverviewHeader from './components/OverviewHeader.jsx'
import Metrics from './components/Metrics'
import OverviewChart from './components/OverviewChart.jsx'
import UpcomingEvents from './components/UpcomingEvents'
import {apiGetOverview} from '@/services/DashboardService'
import useSWR from 'swr'
const Overview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('monthly')

    const {data, isLoading, mutate} = useSWR(
        ['/api/dashboard/overview', {period: selectedPeriod}],
        ([_, params]) => apiGetOverview(params),
        {
            revalidateOnFocus: false,
            // revalidateIfStale: false,
            // revalidateOnReconnect: false,
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
            <div className="flex flex-col gap-4">
                <OverviewHeader
                    selectedPeriod={selectedPeriod}
                    handlePeriodChange={handlePeriodChange}
                />
                <div className="flex flex-col 2xl:grid grid-cols-4 gap-4">
                    <div className="col-span-4 2xl:col-span-3 overview-chart">
                        <OverviewChart
                            data={data}
                        />
                    </div>
                    <div className="2xl:col-span-1 overview-metrics">
                        <Metrics
                            data={data?.summary}
                            selectedPeriod={selectedPeriod}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 xl:col-span-4 upcoming-events-card">
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
        </Loading>
    )
}

export default Overview
