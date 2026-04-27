import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EventListTable from './components/EventListTable.jsx'
import EventListActionTools from './components/EventListActionTools.jsx'
import EventChannelListTableTools from './components/EventChannelListTableTools.jsx'
import EventListSelected from './components/EventListSelected.jsx'
import useTranslation from '@/utils/hooks/useTranslation.js'
import { useEffect } from 'react'
import resetListStore from '@/utils/resetListStore.js'
import {
    initialFilterData,
    initialTableData,
    useEventListStore,
} from './store/eventListStore.js'

const EventList = () => {
    const { t } = useTranslation()

    useEffect(() => {
        return () => {
            resetListStore({
                store: useEventListStore,
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
                            <h3>{t('Events')}</h3>
                            <EventListActionTools />
                        </div>
                        <EventChannelListTableTools />
                        <EventListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <EventListSelected />
        </>
    )
}

export default EventList
