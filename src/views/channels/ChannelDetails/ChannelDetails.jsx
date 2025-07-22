import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import InfoSection from './InfoSection.jsx'
import {apiDeleteChannel, apiGetChannel} from '@/services/ChannelService.js'
import useSWR from 'swr'
import {useNavigate, useParams} from 'react-router'
import isEmpty from 'lodash/isEmpty'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {useState} from "react";
import {ConfirmDialog} from "@/components/shared/index.jsx";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import ChannelHistorySection from "@/views/channels/ChannelDetails/ChannelHistorySection.jsx";

const {TabNav, TabList, TabContent} = Tabs

const ChannelDetails = () => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const {id} = useParams()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {data, isLoading} = useSWR(
        ['/api/channels', {id: id}],
        ([_, params]) => apiGetChannel(params),
        {
            revalidateOnFocus: false,
            // revalidateIfStale: false,
            // revalidateOnReconnect: false,
        },
    )

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleConfirmDisconnect = async () => {

        await apiDeleteChannel({id: data?.id});

        setDialogOpen(false)

        toast.push(
            <Notification type="success">{t('Channel Removed Successful')}</Notification>,
            {placement: 'top-center'},
        )

        navigate('/channels')
    }

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] max-w-[330px] 2xl:min-w-[400px]">
                        <InfoSection data={data} handleDialogOpen={handleDialogOpen}/>
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="billing">
                            <TabList>
                                <TabNav value="billing">{t('Event History')}</TabNav>
                                {/*<TabNav value="activity">Activity</TabNav>*/}
                            </TabList>
                            <div className="p-4">
                                <TabContent value="billing">
                                    <ChannelHistorySection data={data}/>
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
                    <ConfirmDialog
                        isOpen={dialogOpen}
                        type="danger"
                        title={t('Delete Channel')}
                        onClose={() => setDialogOpen(false)}
                        onRequestClose={() => setDialogOpen(false)}
                        onCancel={() => setDialogOpen(false)}
                        onConfirm={handleConfirmDisconnect}
                    >
                        <p>
                            {t('Are you sure you want to delete?')}
                        </p>
                    </ConfirmDialog>
                </div>

            )}
        </Loading>
    )
}

export default ChannelDetails
