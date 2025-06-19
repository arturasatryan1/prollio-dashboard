import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'
import PaymentHistorySection from './PaymentHistorySection.jsx'
// import ActivitySection from './ActivitySection'
import { apiGetChannel } from '@/services/ChannelService.js'
import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'

const { TabNav, TabList, TabContent } = Tabs

const ChannelDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/channels', { id: id }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetChannel(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="billing">
                            <TabList>
                                <TabNav value="billing">History</TabNav>
                                {/*<TabNav value="activity">Activity</TabNav>*/}
                            </TabList>
                            <div className="p-4">
                                <TabContent value="billing">
                                    <PaymentHistorySection data={data} />
                                </TabContent>
                                <TabContent value="activity">
                                    {/*<ActivitySection*/}
                                    {/*    customerName={data.name}*/}
                                    {/*    id={id}*/}
                                    {/*/>*/}
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default ChannelDetails
