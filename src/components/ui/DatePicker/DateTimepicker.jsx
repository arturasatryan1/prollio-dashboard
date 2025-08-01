import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import useControllableState from '../hooks/useControllableState'
import useMergedRef from '../hooks/useMergeRef'
import capitalize from '../utils/capitalize'
import TimeInput from '../TimeInput/TimeInput'
import Calendar from './Calendar'
import BasePicker from './BasePicker'
import Button from '../Button/Button'
import { useConfig } from '../ConfigProvider'

const DEFAULT_INPUT_FORMAT = 'DD MMMM YYYY HH:mm'

const DateTimepicker = (props) => {
    const {
        amPm = true,
        className,
        clearable = true,
        closePickerOnChange = false,
        dateViewCount,
        dayClassName,
        dayStyle,
        defaultMonth,
        defaultOpen = false,
        defaultValue,
        defaultView,
        disabled = false,
        disableDate,
        enableHeaderLabel,
        disableOutOfMonth,
        firstDayOfWeek = 'monday',
        hideOutOfMonthDates,
        hideWeekdays,
        inputFormat,
        inputPrefix,
        inputSuffix,
        inputtable,
        labelFormat = {
            month: 'MMM',
            year: 'YYYY',
        },
        locale,
        maxDate,
        minDate,
        name = 'dateTime',
        okButtonContent = 'OK',
        onBlur,
        onChange,
        onFocus,
        onDropdownClose,
        onDropdownOpen,
        openPickerOnClear,
        ref = null,
        renderDay,
        size,
        value,
        weekendDays,
        yearLabelFormat,
        ...rest
    } = props

    const { locale: themeLocale } = useConfig()

    const finalLocale = locale || themeLocale

    const dateFormat = inputFormat || DEFAULT_INPUT_FORMAT

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen)

    const inputRef = useRef(null)

    // eslint-disable-next-line no-unused-vars
    const [_, setLastValidValue] = useState(defaultValue ?? null)
    const [_value, setValue] = useControllableState({
        prop: value,
        defaultProp: defaultValue,
        onChange,
    })

    const [calendarMonth, setCalendarMonth] = useState(
        _value || defaultMonth || new Date(),
    )

    const [focused, setFocused] = useState(false)
    const [inputState, setInputState] = useState(
        _value instanceof Date
            ? capitalize(dayjs(_value).locale(finalLocale).format(dateFormat))
            : '',
    )

    const closeDropdown = () => {
        setDropdownOpened(false)
        onDropdownClose?.()
    }

    const openDropdown = () => {
        setDropdownOpened(true)
        onDropdownOpen?.()
    }

    useEffect(() => {
        if (value === null && !focused) {
            setInputState('')
        }

        if (value instanceof Date && !focused) {
            setInputState(dayjs(value).locale(finalLocale).format(dateFormat))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, focused])

    const handleValueChange = (date) => {
        if (_value) {
            date.setHours(_value.getHours())
            date.setMinutes(_value.getMinutes())
        } else {
            const now = new Date(Date.now())
            date.setHours(now.getHours())
            date.setMinutes(now.getMinutes())
        }
        setValue(date)
        if (!value && !closePickerOnChange) {
            setInputState(dayjs(date).locale(finalLocale).format(dateFormat))
        }
        closePickerOnChange &&
            setInputState(
                capitalize(dayjs(date).locale(finalLocale).format(dateFormat)),
            )
        closePickerOnChange && closeDropdown()
        window.setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleClear = () => {
        setValue(null)
        setLastValidValue(null)
        setInputState('')
        openPickerOnClear && openDropdown()
        inputRef.current?.focus()
        onChange?.(null)
    }

    const parseDate = (date) => dayjs(date, dateFormat, finalLocale).toDate()

    const handleInputBlur = (event) => {
        typeof onBlur === 'function' && onBlur(event)
        setFocused(false)
    }

    const handleInputFocus = (event) => {
        typeof onFocus === 'function' && onFocus(event)
        setFocused(true)
    }

    const handleChange = (event) => {
        openDropdown()

        const date = parseDate(event.target.value)
        if (dayjs(date).isValid()) {
            setValue(date)
            setLastValidValue(date)
            closePickerOnChange && setInputState(event.target.value)
            setCalendarMonth(date)
        } else {
            closePickerOnChange && setInputState(event.target.value)
        }
    }

    const handleTimeChange = (time) => {
        if (_value instanceof Date && time instanceof Date) {
            const newDateTime = new Date(
                _value.getFullYear(),
                _value.getMonth(),
                _value.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds(),
                time.getMilliseconds(),
            )
            setValue(newDateTime)

            if (!value && !closePickerOnChange) {
                setInputState(
                    capitalize(
                        dayjs(newDateTime)
                            .locale(finalLocale)
                            .format(dateFormat),
                    ),
                )
            }

            closePickerOnChange &&
                setInputState(
                    capitalize(
                        dayjs(newDateTime)
                            .locale(finalLocale)
                            .format(dateFormat),
                    ),
                )
        }
        closePickerOnChange && closeDropdown()
    }

    const handleOk = () => {
        setInputState(
            capitalize(dayjs(_value).locale(finalLocale).format(dateFormat)),
        )
        closeDropdown()
        window.setTimeout(() => inputRef.current?.focus(), 0)
        onChange?.(_value)
    }

    return (
        <BasePicker
            ref={useMergedRef(ref, inputRef)}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
            className={className}
            name={name}
            inputLabel={inputState}
            clearable={clearable && !!_value && !disabled}
            disabled={disabled}
            size={size}
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onClear={handleClear}
            onDropdownClose={onDropdownClose}
            onDropdownOpen={onDropdownOpen}
            {...rest}
        >
            <Calendar
                locale={finalLocale}
                month={inputtable ? calendarMonth : undefined}
                defaultMonth={
                    defaultMonth ||
                    (_value instanceof Date ? _value : new Date())
                }
                value={
                    _value instanceof Date
                        ? _value
                        : _value && dayjs(_value).toDate()
                }
                labelFormat={labelFormat}
                dayClassName={dayClassName}
                dayStyle={dayStyle}
                disableOutOfMonth={disableOutOfMonth}
                minDate={minDate}
                maxDate={maxDate}
                disableDate={disableDate}
                firstDayOfWeek={firstDayOfWeek}
                preventFocus={false}
                dateViewCount={dateViewCount}
                enableHeaderLabel={enableHeaderLabel}
                defaultView={defaultView}
                hideOutOfMonthDates={hideOutOfMonthDates}
                hideWeekdays={hideWeekdays}
                renderDay={renderDay}
                weekendDays={weekendDays}
                yearLabelFormat={yearLabelFormat}
                onMonthChange={setCalendarMonth}
                onChange={handleValueChange}
            />
            <div className="flex items-center gap-4 mt-4">
                <TimeInput
                    disabled={!_value}
                    value={_value}
                    format={amPm ? '12' : '24'}
                    clearable={false}
                    size="sm"
                    onChange={handleTimeChange}
                />
                <Button size="sm" disabled={!_value} onClick={handleOk}>
                    {okButtonContent}
                </Button>
            </div>
        </BasePicker>
    )
}

DateTimepicker.displayName = 'DateTimepicker'

export default DateTimepicker
