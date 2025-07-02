import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ExpertListTable from './components/ExpertListTable.jsx'
import ExpertListActionTools from './components/ExpertListActionTools.jsx'
import ExpertListTableTools from './components/ExpertListTableTools.jsx'
import ExpertListSelected from './components/ExpertListSelected.jsx'
import useTranslation from "@/utils/hooks/useTranslation.js";

const ExpertList = () => {
    const {t} = useTranslation();

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>{t('Experts')}</h3>
                            {/*<ExpertListActionTools />*/}
                        </div>
                        <ExpertListTableTools />
                        <ExpertListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <ExpertListSelected />
        </>
    )
}

export default ExpertList
