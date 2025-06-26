import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import InfoSection from './InfoSection.jsx'
import PromoCodesSection from "./PromoCodesSection.jsx";

// import ActivitySection from './ActivitySection'
import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import {apiGetEvent} from "@/services/EventService.js";

const { TabNav, TabList, TabContent } = Tabs

const EventDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/events', { id: id }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetEvent(params),
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
                        <InfoSection data={data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="promos">
                            <TabList>
                                <TabNav value="promos">Promo Codes</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="promos">
                                    <PromoCodesSection data={data.promo_codes ?? []} />
                                </TabContent>
                                <TabContent value="activity">
                                    {/* {activeTab === 'activity' && <ActivitySection />} */}
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default EventDetails
