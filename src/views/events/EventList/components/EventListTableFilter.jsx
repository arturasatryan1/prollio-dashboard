import {useState} from 'react'
import Button from '@/components/ui/Button'
import {Form, FormItem} from '@/components/ui/Form'
import {TbFilter} from 'react-icons/tb'
import DatePicker from '@/components/ui/DatePicker'
import {Controller, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {optional, z} from 'zod'
import Select, {Option as DefaultOption} from '@/components/ui/Select'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {Badge, Drawer} from "@/components/ui/index.js";
import {components} from "react-select";
import classNames from '@/utils/classNames'
import useEventList from "@/views/events/EventList/hooks/useEventList.js";
import {apiGetChannelListAll} from "@/services/ChannelService.js";
import dayjs from "dayjs";


const {Control} = components

const validationSchema = z.object({
    status: z
        .object({
            value: z.string(),
            label: z.string(),
            className: z.string(),
        })
        .nullable()
        .optional(),
    channel: z.number().nullable().optional(),
    dateRange: z.tuple([z.date(), z.date()]).nullable().optional(),
})


const EventListTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [channels, setChannels] = useState([])
    const [eventFetching, setEventFetching] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState(null)
    const {filterData, setFilterData} = useEventList()
    const {t} = useTranslation()

    const statusOption = [
        {value: 'upcoming', label: t('upcoming'), className: 'bg-blue-500'},
        {value: 'ongoing', label: t('ongoing'), className: 'bg-green-500'},
        {value: 'finished', label: t('finished'), className: 'bg-gray-500'},
        {value: 'cancelled', label: t('cancelled'), className: 'bg-red-500'},
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

    const fetchEvents = async () => {
        setEventFetching(true)
        try {
            const data = await apiGetChannelListAll({
                channel: selectedChannel?.value
            })

            setChannels(data)
        } catch (err) {
            console.error('Failed to fetch channels', err)
        } finally {
            setEventFetching(false)
        }
    }

    const onEventFieldFocus = () => {
        if (channels.length === 0) {
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
        if (values.status) {
            values.status = values.status.value
        }

        if (values.dateRange && values.dateRange.length) {
            values.dateRange = values.dateRange.map(date => dayjs(date).format('YYYY-MM-DD'));
        }

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
                        <FormItem label={t('Channel')}>
                            <Controller
                                name="channel"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        placeholder={t('Select Channel')}
                                        invalid={Boolean(errors.event)}
                                        value={channels?.filter((option) => option.value === field.value)}
                                        options={channels}
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
                                            <DatePicker.DatePickerRange
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder={t('Select Range')}
                                                inputFormat="MMM, DD YYYY"
                                            />
                                        )
                                    }}
                                />
                            </div>
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

export default EventListTableFilter
