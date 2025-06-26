import useEventList from '../hooks/useEventList.js'
import EventListSearch from './EventListSearch.jsx'
import CustomerTableFilter from './EventListTableFilter.jsx'
import cloneDeep from 'lodash/cloneDeep'

const EventChannelListTableTools = () => {
    const { tableData, setTableData } = useEventList()

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
            <EventListSearch onInputChange={handleInputChange} />
            {/*<CustomerTableFilter />*/}
        </div>
    )
}

export default EventChannelListTableTools
