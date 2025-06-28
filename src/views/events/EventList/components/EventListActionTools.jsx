import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useEventList from '../hooks/useEventList.js'
import { CSVLink } from 'react-csv'
import {FaPlus} from "react-icons/fa";
import useTranslation from "@/utils/hooks/useTranslation.js";

const EventListActionTools = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const { customerList } = useEventList()

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
                icon={<FaPlus className="text-xs" />}
                onClick={() => navigate('/events/create')}
            >
                {t('Create Event')}
            </Button>
        </div>
    )
}

export default EventListActionTools
