import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import usePaymentList from '../hooks/usePaymentList.js'
import { CSVLink } from 'react-csv'
import useTranslation from "@/utils/hooks/useTranslation.js";

const PaymentListActionTools = () => {
    const { itemList } = usePaymentList()
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

export default PaymentListActionTools
