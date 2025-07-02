import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useChannelList from '../hooks/useChannelList.js'
import { CSVLink } from 'react-csv'
import {FaPlus} from "react-icons/fa";
import useTranslation from "@/utils/hooks/useTranslation.js";

const ChannelListActionTools = () => {
    const navigate = useNavigate()

    const { customerList } = useChannelList()
    const { t } = useTranslation()

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
                className={`create-channel-btn`}
                variant="solid"
                icon={<FaPlus className="text-xs" />}
                onClick={() => navigate('/channels/create')}
            >
                {t('Create Channel')}
            </Button>
        </div>
    )
}

export default ChannelListActionTools
