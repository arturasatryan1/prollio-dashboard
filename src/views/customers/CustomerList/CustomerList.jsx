import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import CustomerListTable from './components/CustomerListTable'
import CustomerListActionTools from './components/CustomerListActionTools'
import CustomersListTableTools from './components/CustomersListTableTools'
import CustomerListSelected from './components/CustomerListSelected'
import useTranslation from "@/utils/hooks/useTranslation.js";

const CustomerList = () => {

    const {t} = useTranslation()

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>{t('Subscribers')}</h3>
                            <CustomerListActionTools />
                        </div>
                        <CustomersListTableTools />
                        <CustomerListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <CustomerListSelected />
        </>
    )
}

export default CustomerList
