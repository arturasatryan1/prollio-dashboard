import Button from '@/components/ui/Button'
import {useNavigate} from 'react-router'
import useChannelList from '../hooks/useChannelList.js'
import {FaPlus} from "react-icons/fa";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {useAuth} from "@/auth/index.js";

const ChannelListActionTools = () => {
    const navigate = useNavigate()

    const {itemListTotal} = useChannelList()
    const {t} = useTranslation()

    const {user} = useAuth()
    const expert = user?.expert
    const subscriptionPlan = expert?.plan

    const disabled = expert && (
        (subscriptionPlan?.name === 'basic' && itemListTotal >= 1) ||
        (subscriptionPlan?.name === 'pro' && itemListTotal >= 5) ||
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
                className="create-channel-btn"
                variant="solid"
                icon={<FaPlus className="text-xs"/>}
                onClick={() => navigate('/support/guide')}
                disabled={disabled}
            >
                {t('Connect Channel')}
            </Button>
        </div>
    )
}

export default ChannelListActionTools
