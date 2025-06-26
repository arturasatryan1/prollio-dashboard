import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Switcher from '@/components/ui/Switcher'
import {apiGetSettingsNotification, apiUpdateSettingSecurityPassword} from '@/services/AccontsService'
import useSWR from 'swr'
import cloneDeep from 'lodash/cloneDeep'
import { TbMessageCircleCheck } from 'react-icons/tb'
import {useEffect} from "react";

const emailNotificationOption = [
    {
        label: 'New member alert',
        value: 'newSubscriber',
        desc: 'Get notified when a new user subscribes to your event.',
    },
    {
        label: 'Platform updates',
        value: 'platformUpdates',
        desc: 'Stay informed about new features, improvements, and important announcements.',
    },
    {
        label: 'Tips & best practices',
        value: 'tips',
        desc: 'Occasional tips to help you grow your audience and improve your performance on the platform.',
    },
    {
        label: 'Event reminders',
        value: 'eventReminder',
        desc: 'Receive reminders for upcoming events you’ve scheduled or are involved in.',
    },
]

const notifyMeOption = [
    {
        label: 'All new messages',
        value: 'allNewMessage',
        desc: 'Broadcast notifications to the channel for each new message',
    },
    {
        label: 'Mentions only',
        value: 'mentionsOnly',
        desc: 'Only alert me in the channel if someone mentions me in a message',
    },
    {
        label: 'Nothing',
        value: 'nothing',
        desc: `Don't notify me anything`,
    },
]

const SettingsNotification = () => {
    const {
        data = {
            email: [],
            // desktop: false,
            // unreadMessageBadge: false,
            // notifymeAbout: '',
        },
        mutate,
    } = useSWR(
        '/api/settings/notification/',
        () => apiGetSettingsNotification(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    useEffect(() => {
        const resp = apiUpdateSettingSecurityPassword(data)
    }, [data])

    const handleEmailNotificationOptionChange = (values) => {
        const newData = cloneDeep(data)
        newData.email = values
        mutate(newData, false)
    }

    const handleEmailNotificationOptionCheckAll = (value) => {
        const newData = cloneDeep(data)
        if (value) {
            newData.email = [
                'newSubscriber',
                'platformUpdates',
                'tips',
                'eventReminder',
            ]
        } else {
            newData.email = []
        }

        mutate(newData, false)
    }

    const handleDesktopNotificationCheck = (value) => {
        const newData = cloneDeep(data)
        newData.desktop = value
        mutate(newData, false)
    }

    const handleUnreadMessagebadgeCheck = (value) => {
        const newData = cloneDeep(data)
        newData.unreadMessageBadge = value
        mutate(newData, false)
    }

    const handleNotifyMeChange = (value) => {
        const newData = cloneDeep(data)
        newData.notifymeAbout = value
        mutate(newData, false)
    }

    return (
        <div>
            <h4>Notification</h4>
            <div className="mt-2">
                {/*<div className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-600">*/}
                {/*    <div>*/}
                {/*        <h5>Enable desktop notification</h5>*/}
                {/*        <p>*/}
                {/*            Decide whether you want to be notified of new*/}
                {/*            message & updates*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <Switcher*/}
                {/*            checked={data.desktop}*/}
                {/*            onChange={handleDesktopNotificationCheck}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-600">*/}
                {/*    <div>*/}
                {/*        <h5>Enable unread notification badge</h5>*/}
                {/*        <p>*/}
                {/*            Display a red indicator on of the notification icon*/}
                {/*            when you have unread message*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <Switcher*/}
                {/*            checked={data.unreadMessageBadge}*/}
                {/*            onChange={handleUnreadMessagebadgeCheck}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="py-6 border-b border-gray-200 dark:border-gray-600">*/}
                {/*    <h5>Enable unread notification badge</h5>*/}
                {/*    <div className="mt-4">*/}
                {/*        <Radio.Group*/}
                {/*            vertical*/}
                {/*            className="flex flex-col gap-6"*/}
                {/*            value={data.notifymeAbout}*/}
                {/*            onChange={handleNotifyMeChange}*/}
                {/*        >*/}
                {/*            {notifyMeOption.map((option) => (*/}
                {/*                <div key={option.value} className="flex gap-4">*/}
                {/*                    <div className="mt-1.5">*/}
                {/*                        <Radio value={option.value} />*/}
                {/*                    </div>*/}
                {/*                    <div className="flex gap-2">*/}
                {/*                        <div className="mt-1">*/}
                {/*                            <TbMessageCircleCheck className="text-lg" />*/}
                {/*                        </div>*/}
                {/*                        <div>*/}
                {/*                            <h6>{option.label}</h6>*/}
                {/*                            <p>{option.desc}</p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </Radio.Group>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="flex items-center justify-between py-6">
                    <div>
                        <h5>Email notification</h5>
                        <p>
                            Receive email alerts for important updates and activity on your account.
                        </p>
                    </div>
                    <div>
                        <Switcher
                            checked={data.email.length > 0}
                            onChange={handleEmailNotificationOptionCheckAll}
                        />
                    </div>
                </div>
                <Checkbox.Group
                    vertical
                    className="flex flex-col gap-6"
                    value={data.email}
                    onChange={handleEmailNotificationOptionChange}
                >
                    {emailNotificationOption.map((option) => (
                        <div key={option.value} className="flex gap-4">
                            <div className="mt-1.5">
                                <Checkbox value={option.value} />
                            </div>
                            <div>
                                <h6>{option.label}</h6>
                                <p>{option.desc}</p>
                            </div>
                        </div>
                    ))}
                </Checkbox.Group>
            </div>
        </div>
    )
}

export default SettingsNotification
