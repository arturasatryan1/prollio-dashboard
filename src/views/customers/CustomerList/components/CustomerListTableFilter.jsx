import {useState} from 'react'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import {Form, FormItem} from '@/components/ui/Form'
import {TbFilter} from 'react-icons/tb'
import DatePicker from '@/components/ui/DatePicker'
import {Controller, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import Select, {Option as DefaultOption} from "@/components/ui/Select/index.jsx";
import useCustomerList from "@/views/customers/CustomerList/hooks/useCustomerList.js";
import {apiGetEventListAll} from "@/services/EventService.js";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {Badge, Drawer} from "@/components/ui/index.js";
import dayjs from "dayjs";
import classNames from "@/utils/classNames.js";
import {components} from 'react-select'

const {Control} = components

const typeList = [
    'guest',
    'subscriber'
]
const validationSchema = z.object({
    type: z.array(z.string()).optional(),
    status: z
        .object({
            value: z.string(),
            label: z.string(),
            className: z.string(),
        })
        .nullable()
        .optional(),
    channel: z.number().nullable().optional(),
    event: z.number().nullable().optional(),
    dateRange: z.tuple([z.date(), z.date()]).nullable().optional(),
})

const CustomControl = ({children, ...props}) => {
    const selected = props.getValue()[0]

    return (
        <Control {...props}>
            {selected && (
                <Badge className={classNames('ml-4', selected.className)}/>
            )}
            {children}
        </Control>
    )
}

const CustomSelectOption = (props) => {
    return (
        <DefaultOption
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Badge className={data.className}/>
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </span>
            )}
        />
    )
}

const CustomerListTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [events, setEvents] = useState([])
    const [eventFetching, setEventFetching] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState(null)
    const {filterData, setFilterData} = useCustomerList()
    const {t} = useTranslation()

    const statusOption = [
        {value: '', label: t('All'), className: 'bg-gray-200'},
        {value: 'active', label: t('Active'), className: 'bg-emerald-500'},
        {value: 'expired', label: t('Expired'), className: 'bg-gray-500'},
        {value: 'removed', label: t('Removed'), className: 'bg-orange-500'},
        {value: 'blocked', label: t('Blocked'), className: 'bg-red-500'},
    ];

    const {
        handleSubmit,
        reset,
        formState: {errors},
        control
    } = useForm({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const fetchEvents = async () => {
        setEventFetching(true)
        try {
            const data = await apiGetEventListAll({
                channel: selectedChannel?.value
            })
            setEvents(data)
        } catch (err) {
            console.error('Failed to fetch channels', err)
        } finally {
            setEventFetching(false)
        }
    }

    const onEventFieldFocus = () => {
        if (events.length === 0) {
            fetchEvents().then(res => {
            })
        }
    }


    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const handleResetFilter = () => {
        reset()
    }
    const onSubmit = (values) => {
        if (values.dateRange && values.dateRange.length) {
            values.dateRange = values.dateRange.map(date => dayjs(date).format('YYYY-MM-DD'));
        }

        values.status = values?.status?.value
        setFilterData(values)
        setIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter/>} onClick={() => openDialog()}>
                {t('Filter')}
            </Button>
            <Drawer
                title={t('Filter')}
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                >
                    <div>
                        <FormItem label={t('Event')}>
                            <Controller
                                name="event"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        placeholder={t('Select Event')}
                                        invalid={Boolean(errors.event)}
                                        value={events?.filter((option) => option.value === field.value)}
                                        options={events}
                                        onFocus={onEventFieldFocus}
                                        isLoading={eventFetching}
                                        onChange={(selected) => {
                                            field.onChange(selected?.value)
                                        }}
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label={t('Date')}
                            invalid={Boolean(errors.dateRange)}
                            errorMessage={errors.dateRange?.message}

                        >
                            <div className="flex items-center gap-2">
                                <Controller
                                    name="dateRange"
                                    control={control}
                                    render={({field}) => {
                                        return (
                                            (
                                                <DatePicker.DatePickerRange
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder={t('Select Range')}
                                                />
                                            )
                                        )
                                    }}
                                />
                            </div>
                        </FormItem>
                        <FormItem label={t('Type')}>
                            <Controller
                                name="type"
                                control={control}
                                render={({field}) => (
                                    <Checkbox.Group
                                        // horizontal
                                        className="flex mt-4"
                                        {...field}
                                    >
                                        {typeList.map((source, index) => (
                                            <Checkbox
                                                key={source + index}
                                                name={field.name}
                                                value={source}
                                                className="justify-between flex-row-reverse heading-text"
                                            >
                                                {t(source)}
                                            </Checkbox>
                                        ))}
                                    </Checkbox.Group>
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label={t('Status')}
                            invalid={Boolean(errors.status)}
                            errorMessage={errors.status?.message}
                        >
                            <Controller
                                name="status"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        placeholder={t('Select Status')}
                                        options={statusOption}
                                        value={statusOption.filter((option) => option.value === field.value)}
                                        components={{
                                            Option: CustomSelectOption,
                                            Control: CustomControl,
                                        }}
                                        onChange={(option) => field.onChange(option?.value)}
                                        {...field}

                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <Button type="button" onClick={handleResetFilter}>
                            {t('Reset')}
                        </Button>
                        <Button type="submit" variant="solid">
                            {t('Apply')}
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    )
}

export default CustomerListTableFilter
