import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useCustomerList from '../hooks/useCustomerList'
import { CSVLink } from 'react-csv'
import useTranslation from "@/utils/hooks/useTranslation.js";

const CustomerListActionTools = () => {
    const {t} = useTranslation()
    const { customerList } = useCustomerList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={customerList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    {t('Download')}
                </Button>
            </CSVLink>
            {/*<Button*/}
            {/*    variant="solid"*/}
            {/*    icon={<TbUserPlus className="text-xl" />}*/}
            {/*    onClick={() => navigate('/concepts/customers/customer-create')}*/}
            {/*>*/}
            {/*    Add new*/}
            {/*</Button>*/}
        </div>
    )
}

export default CustomerListActionTools
