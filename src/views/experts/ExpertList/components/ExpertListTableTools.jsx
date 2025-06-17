import useExpertList from '../hooks/useExpertList.js'
import ExpertListSearch from './ExpertListSearch.jsx'
import ExpertListTableFilter from './ExpertListTableFilter.jsx'
import cloneDeep from 'lodash/cloneDeep'

const ExpertListTableTools = () => {
    const { tableData, setTableData } = useExpertList()

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
            <ExpertListSearch onInputChange={handleInputChange} />
            {/*<ExpertListTableFilter />*/}
        </div>
    )
}

export default ExpertListTableTools
