import cloneDeep from 'lodash/cloneDeep'

const resetListStore = ({
    store,
    initialTableData,
    initialFilterData,
    selectedState = {},
}) => {
    store.setState({
        tableData: cloneDeep(initialTableData),
        filterData: cloneDeep(initialFilterData),
        ...cloneDeep(selectedState),
    })
}

export default resetListStore
