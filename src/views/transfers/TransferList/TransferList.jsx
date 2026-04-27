import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import TransferListTable from './components/TransferListTable.jsx'
import TransferListActionTools from './components/TransferListActionTools.jsx'
import TransferListTableTools from './components/TransferListTableTools.jsx'
import useTranslation from '@/utils/hooks/useTranslation.js'
import { useEffect } from 'react'
import resetListStore from '@/utils/resetListStore.js'
import {
    initialFilterData,
    initialTableData,
    useTransferListStore,
} from './store/transferListStore.js'

const TransferList = () => {
    const { t } = useTranslation()

    useEffect(() => {
        return () => {
            resetListStore({
                store: useTransferListStore,
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
                            <h3>{t('Transfers')}</h3>
                            <TransferListActionTools />
                        </div>
                        <TransferListTableTools />
                        <TransferListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            {/*<RequestListSelected />*/}
        </>
    )
}

export default TransferList
