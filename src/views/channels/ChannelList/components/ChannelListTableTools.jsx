import useChannelList from '../hooks/useChannelList.js'
import ChannelListSearch from './ChannelListSearch.jsx'
import CustomerTableFilter from './ChannelListTableFilter.jsx'
import cloneDeep from 'lodash/cloneDeep'

const ChannelListTableTools = () => {
    const { tableData, setTableData } = useChannelList()

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
            <ChannelListSearch onInputChange={handleInputChange} />
            {/*<CustomerTableFilter />*/}
        </div>
    )
}

export default ChannelListTableTools
