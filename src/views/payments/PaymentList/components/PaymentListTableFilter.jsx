import {useState} from 'react'
import Button from '@/components/ui/Button'
import {Form, FormItem} from '@/components/ui/Form'
import {TbFilter, TbMinus} from 'react-icons/tb'
import DatePicker from '@/components/ui/DatePicker'
import {Controller, useController, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import Select, {Option as DefaultOption} from '@/components/ui/Select'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {Badge, Drawer, Input} from "@/components/ui/index.js";
import {components} from "react-select";
import classNames from '@/utils/classNames'
import dayjs from "dayjs";
import {apiGetEventListAll} from "@/services/EventService.js";
import usePaymentList from "@/views/payments/PaymentList/hooks/usePaymentList.js";

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
    event: z.number().nullable().optional(),
    dateRange: z.tuple([z.date(), z.date()]).nullable().optional(),
    minAmount: z.union([z.string(), z.number()]).nullable().optional(),
    maxAmount: z.union([z.string(), z.number()]).nullable().optional(),
})

const PaymentListTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [events, setEvents] = useState([])
    const [eventFetching, setEventFetching] = useState(false)
    const {filterData, setFilterData} = usePaymentList()
    const {t} = useTranslation()

    const statusOption = [
        {value: 'pending', label: t('pending'), className: 'bg-blue-500'},
        {value: 'completed', label: t('completed'), className: 'bg-green-500'},
        {value: 'failed', label: t('failed'), className: 'bg-red-500'},
    ];

    const {
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: {errors},
        control
    } = useForm({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })
    const {field} = useController({
        name: 'maxAmount',
        control,
    });

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
            const data = await apiGetEventListAll()
            setEvents(data)
        } catch (err) {
            console.error('Failed to fetch events', err)
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
                        <FormItem label={t('Amount')}>
                            <div className="flex items-center gap-2">
                                <Controller
                                    name="minAmount"
                                    control={control}
                                    render={({field}) => (
                                        // <NumericInput
                                        <Input
                                            // thousandSeparator
                                            type="number"
                                            // inputPrefix="֏"
                                            autoComplete="off"
                                            placeholder="0.00"
                                            value={field.value}
                                            // max={getValues('maxAmount') || null}
                                            // isAllowed={(values) => {
                                            //     const { floatValue } = values
                                            //     return (
                                            //         (floatValue || 0) <=
                                            //         getValues('maxAmount')
                                            //     )
                                            // }}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    )}
                                />
                                <span>
                                    <TbMinus/>
                                </span>
                                <Controller
                                    name="maxAmount"
                                    control={control}
                                    render={({field}) => (
                                        // <NumericInput
                                        <Input
                                            // thousandSeparator
                                            type="number"
                                            // inputPrefix="֏"
                                            autoComplete="off"
                                            placeholder="0.00"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    )}
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

export default PaymentListTableFilter
