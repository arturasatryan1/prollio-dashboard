import usePaymentList from '../hooks/usePaymentList.js'
import cloneDeep from 'lodash/cloneDeep'
import PaymentListSearch from "@/views/payments/PaymentList/components/PaymentListSearch.jsx";
import PaymentListTableFilter from "@/views/payments/PaymentList/components/PaymentListTableFilter.jsx";

const PaymentListTableTools = () => {
    const { tableData, setTableData } = usePaymentList()

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <PaymentListSearch onInputChange={handleInputChange} />
            <PaymentListTableFilter />
        </div>
    )
}

export default PaymentListTableTools
