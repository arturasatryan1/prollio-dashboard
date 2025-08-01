import { useState } from 'react'
import dayjs from 'dayjs'
import { isSameDate } from './utils/isSameDate'
import CalendarBase from './CalendarBase'

const RangeCalendar = (props) => {
    const {
        value,
        onChange,
        dayStyle,
        singleDate = false,
        dateViewCount = 1,
        paginateBy,
        ref,
        ...rest
    } = props

    const [hoveredDay, setHoveredDay] = useState(null)
    const [pickedDate, setPickedDate] = useState(null)

    const setRangeDate = (date) => {
        if (pickedDate instanceof Date) {
            if (isSameDate(date, pickedDate) && !singleDate) {
                setPickedDate(null)
                setHoveredDay(null)
                return null
            }

            const result = [date, pickedDate]
            result.sort((a, b) => a.getTime() - b.getTime())
            onChange(result)
            setPickedDate(null)
            return null
        }

        if (value && value[0] && isSameDate(date, value[0]) && !singleDate) {
            setPickedDate(null)
            setHoveredDay(null)
            onChange([null, null])
            return null
        }

        onChange([date, null])
        setPickedDate(date)
        return null
    }

    const shouldHighlightDate = (date, modifiers) => {
        if (pickedDate instanceof Date && hoveredDay instanceof Date) {
            const result = [hoveredDay, pickedDate]
            result.sort((a, b) => a.getTime() - b.getTime())
            return (
                !modifiers.selected &&
                dayjs(date).subtract(1, 'day').isBefore(result[1]) &&
                dayjs(date).add(1, 'day').isAfter(result[0])
            )
        }

        return false
    }

    const isPickedDateFirstInRange = (date, modifiers) => {
        if (pickedDate instanceof Date && hoveredDay instanceof Date) {
            const result = [hoveredDay, pickedDate]
            result.sort((a, b) => a.getTime() - b.getTime())
            return modifiers.selected && dayjs(date).isBefore(result[1])
        }

        return false
    }

    const isPickedDateLastInRange = (date, modifiers) => {
        if (pickedDate instanceof Date && hoveredDay instanceof Date) {
            const result = [hoveredDay, pickedDate]
            result.sort((a, b) => a.getTime() - b.getTime())
            return modifiers.selected && dayjs(date).isAfter(result[0])
        }

        return false
    }

    return (
        <CalendarBase
            ref={ref}
            dayStyle={dayStyle}
            value={pickedDate}
            range={value}
            dateViewCount={dateViewCount}
            paginateBy={paginateBy || dateViewCount}
            hideOutOfMonthDates={dateViewCount > 1}
            isDateInRange={shouldHighlightDate}
            isDateFirstInRange={isPickedDateFirstInRange}
            isDateLastInRange={isPickedDateLastInRange}
            onDayMouseEnter={(date) => setHoveredDay(date)}
            onChange={(date) => setRangeDate(date)}
            {...rest}
        />
    )
}

export default RangeCalendar
