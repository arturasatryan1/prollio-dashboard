import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EventListTable from './components/EventListTable.jsx'
import EventListActionTools from './components/EventListActionTools.jsx'
import EventChannelListTableTools from './components/EventChannelListTableTools.jsx'
import EventListSelected from './components/EventListSelected.jsx'

const EventList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Events</h3>
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
