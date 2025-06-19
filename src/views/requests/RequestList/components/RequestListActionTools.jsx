import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useRequestList from '../hooks/useRequestList.js'
import { CSVLink } from 'react-csv'

const RequestListActionTools = () => {
    const navigate = useNavigate()

    const { customerList } = useRequestList()

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
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/concepts/customers/customer-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default RequestListActionTools
