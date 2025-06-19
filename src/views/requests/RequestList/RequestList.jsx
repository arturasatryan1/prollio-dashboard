import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import RequestListTable from './components/RequestListTable.jsx'
import RequestListActionTools from './components/RequestListActionTools.jsx'
import RequestListTableTools from './components/RequestListTableTools.jsx'
import RequestListSelected from './components/RequestListSelected.jsx'

const RequestList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Requests</h3>
                            {/*<ExpertListActionTools />*/}
                        </div>
                        {/*<RequestListTableTools />*/}
                        <RequestListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/*<RequestListSelected />*/}
        </>
    )
}

export default RequestList
