import usePayoutList from '../hooks/usePayoutList.js'
import PayoutListSearch from './PayoutListSearch.jsx'
import PayoutListTableFilter from './PayoutListTableFilter.jsx'
import cloneDeep from 'lodash/cloneDeep'

const PayoutListTableTools = () => {
    const { tableData, setTableData } = usePayoutList()

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
            <PayoutListSearch onInputChange={handleInputChange} />
            {/*<PayoutListTableFilter />*/}
        </div>
    )
}

export default PayoutListTableTools
