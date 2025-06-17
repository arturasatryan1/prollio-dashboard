import { useState } from 'react'
import Loading from '@/components/shared/Loading'
// import OverviewHeader from './components/OverviewHeader.jsx'
// import Metrics from './components/Metrics'
// import WebAnalytic from './components/OverviewChart.jsx'
// import Traffic from './components/Traffic'
// import TopChannel from './components/TopChannel'
// import DeviceSession from './components/DeviceSession'
// import TopPerformingPages from './components/TopPerformingPages'
import { apiGetChannel } from '@/services/ChannelService'
import useSWR from 'swr'

const Overview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('thisMonth')

    const { data, isLoading } = useSWR(
        ['/api/dashboard/channels'],
        () => apiGetChannel(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {'Channels'}
        </Loading>
    )
}

export default Overview
