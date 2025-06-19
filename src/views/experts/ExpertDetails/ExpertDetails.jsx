import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'
import BillingSection from './BillingSection'
import ActivitySection from './ActivitySection'
import { apiGetExpert } from '@/services/ExpertService.js'
import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import InfoSection from "@/views/experts/ExpertDetails/InfoSection.jsx";

const { TabNav, TabList, TabContent } = Tabs

const ExpertDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/experts', { id: id }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetExpert(params),
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
                        <Tabs defaultValue="info">
                            <TabList>
                                <TabNav value="info">Expert Info</TabNav>
                                <TabNav value="billing">Transaction History</TabNav>
                                <TabNav value="activity">Activity</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="info">
                                    <InfoSection data={data} />
                                </TabContent>
                                <TabContent value="billing">
                                    <BillingSection data={data} />
                                </TabContent>
                                <TabContent value="activity">
                                    {/*<ActivitySection*/}
                                    {/*    customerName={expert.name}*/}
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

export default ExpertDetails
