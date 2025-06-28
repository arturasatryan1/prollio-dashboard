import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import usePayoutList from '../hooks/usePayoutList.js'
import { CSVLink } from 'react-csv'
import useTranslation from "@/utils/hooks/useTranslation.js";

const PayoutListActionTools = () => {
    const { itemList } = usePayoutList()

    const {t} = useTranslation()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="payouts.csv"
                data={itemList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    {t('Download')}
                </Button>
            </CSVLink>
        </div>
    )
}

export default PayoutListActionTools
