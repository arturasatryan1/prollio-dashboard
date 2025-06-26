import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import PaymentListTable from './components/PaymentListTable.jsx'
import PaymentListActionTools from './components/PaymentListActionTools.jsx'
import PaymentListTableTools from './components/PaymentListTableTools.jsx'

const PaymentList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Payments</h3>
                            <PaymentListActionTools />
                        </div>
                        <PaymentListTableTools />
                        <PaymentListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/*<RequestListSelected />*/}
        </>
    )
}

export default PaymentList
