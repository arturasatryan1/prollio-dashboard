import {useEffect, useState} from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Checkbox from '@/components/ui/Checkbox'
import {Form, FormItem} from '@/components/ui/Form'
import {TbFilter} from 'react-icons/tb'
import {Controller, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {nullable, z} from 'zod'
import {apiGetChannelListAll} from "@/services/ChannelService.js";
import Select from "@/components/ui/Select/index.jsx";
import useCustomerList from "@/views/customers/CustomerList/hooks/useCustomerList.js";
import {apiGetEventListAll} from "@/services/EventService.js";
import useTranslation from "@/utils/hooks/useTranslation.js";

const statusList = [
    'active',
    'inactive'
]

const validationSchema = z.object({
    status: z.array(z.string()).optional(),
    channel: z.number().nullable().optional(),
    event: z.number().nullable().optional(),
})

const CustomerListTableFilter = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [channels, setChannels] = useState([])
    const [events, setEvents] = useState([])
    const [channelFetching, setChannelFetching] = useState(false)
    const [eventFetching, setEventFetching] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState(null)
    const {filterData, setFilterData} = useCustomerList()
    const {t} = useTranslation()

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { errors },
        control
    } = useForm({
        defaultValues: filterData,
        resolver: zodResolver(validationSchema),
    })

    const fetchChannels = async () => {
        setChannelFetching(true)

        try {
            const data = await apiGetChannelListAll()
            setChannels(data)
        } catch (err) {
            console.error('Failed to fetch channels', err)
        } finally {
            setChannelFetching(false)
        }
    }

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

    const onChannelFieldFocus = () => {
        if (channels.length === 0) {
            fetchChannels().then(res => {
            })
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

    const onSubmit = (values) => {
        setFilterData(values)
        setIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter/>} onClick={() => openDialog()}>
                {t('Filter')}
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h4 className="mb-4">{t('Filter')}</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/*<FormItem label={'Channel'}>*/}
                    {/*    <Controller*/}
                    {/*        name="channel"*/}
                    {/*        control={control}*/}
                    {/*        render={({field}) => (*/}
                    {/*            <Select*/}
                    {/*                placeholder="Select Channel"*/}
                    {/*                options={channels}*/}
                    {/*                invalid={Boolean(errors.channel)}*/}
                    {/*                onFocus={onChannelFieldFocus}*/}
                    {/*                isLoading={channelFetching}*/}
                    {/*                value={channels?.filter((option) => option.value === field.value)}*/}
                    {/*                onChange={(selected) => {*/}
                    {/*                    setSelectedChannel(selected)*/}
                    {/*                    setEvents([])*/}
                    {/*                    resetField("event", { defaultValue: null });*/}
                    {/*                    field.onChange(selected?.value)*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</FormItem>*/}
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
                    <FormItem label={t('Status')}>
                        <Controller
                            name="status"
                            control={control}
                            render={({field}) => (
                                <Checkbox.Group
                                    // horizontal
                                    className="flex mt-4"
                                    {...field}
                                >
                                    {statusList.map((source, index) => (
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
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <Button type="button" onClick={() => reset()}>
                            {t('Reset')}
                        </Button>
                        <Button type="submit" variant="solid">
                            {t('Save')}
                        </Button>
                    </div>
                </Form>
            </Dialog>
        </>
    )
}

export default CustomerListTableFilter
