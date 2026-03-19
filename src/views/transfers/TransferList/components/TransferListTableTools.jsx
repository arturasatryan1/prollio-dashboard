import useTransferList from '../hooks/useTransferList.js'
import cloneDeep from 'lodash/cloneDeep'
import TransferListSearch from "@/views/transfers/TransferList/components/TransferListSearch.jsx";
import TransferListTableFilter from "@/views/transfers/TransferList/components/TransferListTableFilter.jsx";

const TransferListTableTools = () => {
    const { tableData, setTableData } = useTransferList()

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
            <TransferListSearch onInputChange={handleInputChange} />
            <TransferListTableFilter />
        </div>
    )
}

export default TransferListTableTools
