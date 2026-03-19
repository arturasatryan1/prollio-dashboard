import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import ProfileSection from './ProfileSection'
import InfoSection from './InfoSection.jsx'
import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import {apiGetRequest} from "@/services/RequestService.js";

const { TabNav, TabList, TabContent } = Tabs

const RequestDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/api/expert-requests', { id: id }],
        // eslint-disable-next-line no-unused-vars
        ([_, params]) => apiGetRequest(params),
        {
            revalidateOnFocus: false,
            // revalidateIfStale: false,
            // revalidateOnReconnect: false,
        },
    )

    const item = data || {}

    return (
        <Loading loading={isLoading}>
            {!isEmpty(item) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <ProfileSection data={item} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="info">
                            <TabList>
                                <TabNav value="info">Provided Information</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="info">
                                    <InfoSection data={item} />
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default RequestDetails
