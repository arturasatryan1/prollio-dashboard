import Button from '@/components/ui/Button'
import {useNavigate} from 'react-router'
import useEventList from '../hooks/useEventList.js'
import {FaPlus} from "react-icons/fa";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {useAuth} from "@/auth/index.js";

const EventListActionTools = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {itemListTotal} = useEventList()
    const {user} = useAuth()
    const expert = user?.expert
    const subscriptionPlan = expert?.plan

    const disabled = expert && (
        (subscriptionPlan?.name === 'basic' && itemListTotal >= 1) ||
        (subscriptionPlan?.name === 'pro' && itemListTotal >= 15) ||
        (!expert?.active)
    )

    return (
        <div className="flex flex-col md:flex-row gap-3">
            {/*<CSVLink*/}
            {/*    className="w-full"*/}
            {/*    filename="customerList.csv"*/}
            {/*    data={customerList}*/}
            {/*>*/}
            {/*    <Button*/}
            {/*        icon={<TbCloudDownload className="text-xl" />}*/}
            {/*        className="w-full"*/}
            {/*    >*/}
            {/*        Download*/}
            {/*    </Button>*/}
            {/*</CSVLink>*/}
            <Button
                variant="solid"
                icon={<FaPlus className="text-xs"/>}
                onClick={() => navigate('/events/create')}
                disabled={disabled}
            >
                {t('Create Event')}
            </Button>
        </div>
    )
}

export default EventListActionTools
