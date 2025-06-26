import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import PayoutListTable from './components/PayoutListTable.jsx'
import PayoutListActionTools from './components/PayoutListActionTools.jsx'
import RequestListTableTools from './components/RequestListTableTools.jsx'
import RequestListSelected from './components/RequestListSelected.jsx'

const PayoutList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Payouts</h3>
                            <PayoutListActionTools />
                        </div>
                        {/*<RequestListTableTools />*/}
                        <PayoutListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/*<RequestListSelected />*/}
        </>
    )
}

export default PayoutList
