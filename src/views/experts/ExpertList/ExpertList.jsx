import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ExpertListTable from './components/ExpertListTable.jsx'
import ExpertListActionTools from './components/ExpertListActionTools.jsx'
import ExpertListTableTools from './components/ExpertListTableTools.jsx'
import ExpertListSelected from './components/ExpertListSelected.jsx'

const ExpertList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Experts</h3>
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
