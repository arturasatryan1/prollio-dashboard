import CalendarBase from './CalendarBase'
import { isSameDate } from './utils'

const Calendar = (props) => {
    const { multipleSelection, value, onChange, ...rest } = props

    const handleChange = (date) => {
        if (!multipleSelection) {
            return onChange?.(date)
        }

        const isSelected = value?.some((val) => isSameDate(val, date))

        return onChange?.(
            isSelected
                ? value?.filter((val) => !isSameDate(val, date))
                : [...value, date],
        )
    }

    return <CalendarBase value={value} onChange={handleChange} {...rest} />
}

export default Calendar
