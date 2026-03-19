import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import useTransferList from '../hooks/useTransferList.js'
import { CSVLink } from 'react-csv'
import useTranslation from "@/utils/hooks/useTranslation.js";

const TransferListActionTools = () => {
    const { itemList } = useTransferList()
    const {t} = useTranslation()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="transfers.csv"
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

export default TransferListActionTools
