import Card from '@/components/ui/Card'
import Plans from './components/Plans'
import Faq from './components/Faq'
import PaymentDialog from './components/PaymentDialog'
import useTranslation from "@/utils/hooks/useTranslation.js";

const Pricing = () => {
    const {t} = useTranslation();

    return (
        <>
            <Card className="mb-4">
                <div className="flex items-center justify-between mb-8">
                    <h3>{t('Pricing')}</h3>
                    {/*<PaymentCycleToggle />*/}
                </div>
                <Plans />
            </Card>
            <Faq />
            <PaymentDialog />
        </>
    )
}

export default Pricing
