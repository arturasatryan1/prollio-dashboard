import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import PayoutListTable from './components/PayoutListTable.jsx'
import PayoutListActionTools from './components/PayoutListActionTools.jsx'
// import RequestListTableTools from './components/RequestListTableTools.jsx'
// import RequestListSelected from './components/RequestListSelected.jsx'
import useTranslation from "@/utils/hooks/useTranslation.js";
import PayoutListTableTools from "./components/PayoutListTableTools.jsx";

const PayoutList = () => {
    const {t} =  useTranslation()

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>{t('Payouts')}</h3>
                            <PayoutListActionTools />
                        </div>
                        <PayoutListTableTools />
                        <PayoutListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/*<RequestListSelected />*/}
        </>
    )
}

export default PayoutList
