import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ChannelListTable from './components/ChannelListTable.jsx'
import ChannelListActionTools from './components/ChannelListActionTools.jsx'
import ChannelListTableTools from './components/ChannelListTableTools.jsx'
import ChannelListSelected from './components/ChannelListSelected.jsx'
import useTranslation from '@/utils/hooks/useTranslation.js'
import { useEffect } from 'react'
import resetListStore from '@/utils/resetListStore.js'
import {
    initialFilterData,
    initialTableData,
    useChannelListStore,
} from './store/channelListStore.js'

const ChannelList = () => {
    const { t } = useTranslation()

    useEffect(() => {
        return () => {
            resetListStore({
                store: useChannelListStore,
                initialTableData,
                initialFilterData,
                selectedState: { selectedItem: [] },
            })
        }
    }, [])

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>{t('Channels')}</h3>
                            <ChannelListActionTools />
                        </div>
                        <ChannelListTableTools />
                        <ChannelListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <ChannelListSelected />
        </>
    )
}

export default ChannelList
