import React, {useEffect, useState} from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import ScrollBar from '@/components/ui/ScrollBar'
import DebouceInput from '@/components/shared/DebouceInput'
import classNames from '@/utils/classNames'
// import { apiGetContacts } from '@/services/ChatService'
import {TbCheck, TbSearch, TbUser} from 'react-icons/tb'
import useLeadMemberList from "@/views/customers/CustomerList/hooks/useLeadMemberList.js";
import {apiDraftMessage} from "@/services/MessageService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {FormItem} from "@/components/ui/Form/index.jsx";
import Select, {Option as DefaultOption} from "@/components/ui/Select/index.jsx";
import dayjs from "dayjs";
import {apiGetEventListAll} from "@/services/EventService.js";
import {Badge, Tag} from "@/components/ui/index.js";

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

const typeColors = {
    guest: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
    subscriber: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
}

const statusColors = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    removed: 'bg-orange-200 dark:bg-orange-200 text-gray-900 dark:text-gray-900',
    expired: 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
};

const NewChat = ({onClose}) => {
    const [contactListDialog, setContactListDialog] = useState(false)
    const [leadMembers, setLeadMembers] = useState([])
    const [selectedLeadMembers, setSelectedLeadMembers] = useState([])
    const [query, setQuery] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [events, setEvents] = useState([])
    const [eventFetching, setEventFetching] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState(null)
    const [filterData, setFilterData] = useState({})


    const {t} = useTranslation();
    const {
        leadMemberList,
        leadMemberListTotal,
        fetchLeadMembers,
        tableData,
        isLoading,
        setTableData,
    } = useLeadMemberList()

    const typeOptions = [
        {
            value: null,
            label: t('All'),
            className: 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100'
        },
        {
            value: 'guest',
            label: t('guest'),
            className: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900'
        },
        {
            value: 'subscriber',
            label: t('subscriber'),
            className: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900'
        },
    ];

    const statusOptions = [
        {value: '', label: t('All'), className: 'bg-gray-200'},
        {value: 'active', label: t('Active'), className: 'bg-emerald-500'},
        {value: 'expired', label: t('Expired'), className: 'bg-gray-500'},
        {value: 'removed', label: t('Removed'), className: 'bg-orange-500'},
        {value: 'blocked', label: t('Blocked'), className: 'bg-red-500'},
    ];

    useEffect(() => {
        if (contactListDialog) {
            const newTableData = {...tableData, pageIndex: 1};

            fetchLeadMembers(newTableData).then((res) => {
                setLeadMembers(res.data || [])
            })
        }
    }, [contactListDialog])

    const handleChange = (name, item) => {
        if (!item) return;

        let updatedFilter = {...filterData};

        if (Array.isArray(item)) {
            if (item.length !== 2) return;

            item = item.map(date => dayjs(date).format('YYYY-MM-DD'));
            updatedFilter[name] = item;
        } else {
            updatedFilter[name] = item.value;
        }

        setFilterData(updatedFilter);

        fetchLeadMembers(updatedFilter).then((res) => {
            setLeadMembers(res.data || []);
        });
    }

    const handleDialogClose = () => {
        setContactListDialog(false)
        setSelectedLeadMembers([])
    }


    const handleStartNewChat = () => {
        try {
            setIsSubmitting(true)
            const memberIds = [...new Set(selectedLeadMembers.map(item => item.member_id))];

            const res = apiDraftMessage({
                memberIds: memberIds,
            })

            if (res) {
                setIsSubmitting(false)
                onClose?.()
                handleDialogClose()
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                {placement: 'top-center'},
            )
        }
    }

    const handleInputChange = (value) => {
        setQuery(value)
    }

    const handleSetSelectedContact = (leadMember) => {
        setSelectedLeadMembers((prevSelectedContacts) => {
            const contactExists = prevSelectedContacts.some(
                (c) => c.id === leadMember.id,
            )

            if (contactExists) {
                return prevSelectedContacts.filter((c) => c.id !== leadMember.id)
            } else {
                return [...prevSelectedContacts, leadMember]
            }
        })
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

    const onEventFieldFocus = () => {
        if (events.length === 0) {
            fetchEvents().then(res => {
            })
        }
    }

    const handleLoadMore = () => {
        if (isLoading) return;

        const nextPage = (tableData.pageIndex || 1) + 1;

        const newTableData = {...tableData, pageIndex: nextPage};

        setTableData(newTableData);

        fetchLeadMembers(newTableData)
            .then((response) => {
                if (response?.data?.length) {
                    setLeadMembers([...leadMembers, ...response.data])
                }
            });
    };

    return (
        <>
            <Button
                block
                variant="solid"
                onClick={() => setContactListDialog(true)}
            >
                {t('New Message')}
            </Button>
            <Dialog
                isOpen={contactListDialog}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
                width={800}
            >
                {leadMemberList && (
                    <div>
                        <div className="text-center mb-6">
                            <h4 className="mb-1">{t('Subscribers List')}</h4>
                        </div>

                        <div className={'md:flex md:gap-4'}>
                            <FormItem className="flex-1">
                                <Select
                                    name={'event'}
                                    placeholder={t('Select Event')}
                                    options={events}
                                    onFocus={onEventFieldFocus}
                                    isLoading={eventFetching}
                                    onChange={(item) => handleChange('event', item)}
                                />
                            </FormItem>
                            <FormItem className="flex-1">
                                <Select
                                    isDisabled={!filterData.event}
                                    name={'type'}
                                    placeholder={t('Select Type')}
                                    options={typeOptions}
                                    value={typeOptions.filter((option) => option.value === filterData.type)}
                                    components={{
                                        Option: CustomSelectOption,
                                    }}
                                    onChange={(item) => handleChange('type', item)}

                                />
                            </FormItem>
                            <FormItem className="flex-1">
                                <Select
                                    isDisabled={!filterData.event}
                                    name={'status'}
                                    placeholder={t('Select Status')}
                                    options={statusOptions}
                                    value={statusOptions.filter((option) => option.value === filterData.status)}
                                    components={{
                                        Option: CustomSelectOption,
                                    }}
                                    onChange={(item) => handleChange('status', item)}

                                />
                            </FormItem>
                            {/*<FormItem className="flex-1">*/}

                            {/*    <div className="flex items-center gap-2">*/}
                            {/*        <DatePicker.DatePickerRange*/}
                            {/*            name={'dateRange'}*/}
                            {/*            onChange={(item) => handleChange('dateRange', item)}*/}
                            {/*            placeholder={t('Select Range')}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</FormItem>*/}
                        </div>
                        {/*<DebouceInput*/}
                        {/*    placeholder={t('Quick search...')}*/}
                        {/*    type="text"*/}
                        {/*    size="sm"*/}
                        {/*    prefix={<TbSearch className="text-lg"/>}*/}
                        {/*    onChange={(e) => handleInputChange(e.target.value)}*/}
                        {/*/>*/}
                        <div className="mt-5">
                            <p className="font-semibold uppercase text-xs mb-4">
                                {leadMemberListTotal} {t('person available')}
                            </p>
                            <div className="mb-6">
                                <ScrollBar
                                    className={classNames(
                                        'overflow-y-auto',
                                    )}
                                >
                                    <div className="h-full pr-3 flex flex-col gap-2">
                                        {leadMembers.map((member, idx) => (
                                            <div key={idx}
                                                 className={classNames(
                                                     'py-3 px-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
                                                     selectedLeadMembers.some(
                                                         (item) => item.id === member.id
                                                     ) &&
                                                     'bg-gray-100 dark:bg-gray-700',
                                                 )}
                                                 role="button"
                                                 onClick={() =>
                                                     handleSetSelectedContact(
                                                         member,
                                                     )
                                                 }
                                            >
                                                <div className="flex items-center gap-2">
                                                    <TbUser size={24}></TbUser>
                                                    <div className="heading-text font-bold">
                                                        <span className={'mr-2'}>{member.first_name} {member.last_name}</span>
                                                        <Tag className={`${typeColors[member.type]} mr-2`}>
                                                            <span className="capitalize">{t(member.type)}</span>
                                                        </Tag>
                                                        <Tag className={statusColors[member.status]}>
                                                            <span className="capitalize">{t(member.status)}</span>
                                                        </Tag>
                                                    </div>
                                                </div>
                                                {selectedLeadMembers.some(
                                                    (item) =>
                                                        item.id === member.id,
                                                ) && (
                                                    <TbCheck className="text-2xl text-primary"/>
                                                )}
                                            </div>
                                        ))}
                                        {leadMembers.length < leadMemberListTotal && (
                                            <div className="text-center mt-4">
                                                <Button
                                                    size="sm"
                                                    loading={isLoading}
                                                    onClick={handleLoadMore}
                                                >
                                                    Load More
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </ScrollBar>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                onClick={handleStartNewChat}
                                disabled={!selectedLeadMembers.length}
                            >
                                {t(selectedLeadMembers.length > 1
                                    ? 'Create Group Message'
                                    : 'Create Message')}
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    )
}

export default NewChat
