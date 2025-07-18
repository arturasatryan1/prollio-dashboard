import Checkbox from '@/components/ui/Checkbox'
import Switcher from '@/components/ui/Switcher'
import {apiGetSettingsNotification, apiUpdateSettingNotifications} from '@/services/AccontsService'
import useSWR from 'swr'
import cloneDeep from 'lodash/cloneDeep'
import useTranslation from "@/utils/hooks/useTranslation.js";

const SettingsNotification = () => {
    const {
        data = {
            notification: []
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

    const {t} = useTranslation()

    const emailNotificationOption = [
        {
            label: t('New member alert'),
            value: 'new_subscriber',
            desc: t('Get notified when a new user subscribes to your event.'),
        },
        {
            label: t('Platform updates'),
            value: 'platform_updates',
            desc: t('Stay informed about new features, improvements, and important announcements.'),
        },
        {
            label: t('Tips & best practices'),
            value: 'tips',
            desc: t('Occasional tips to help you grow your audience and improve your performance on the platform.'),
        },
        {
            label: t('Event reminders'),
            value: 'event_reminder',
            desc: t('Receive reminders for upcoming events you’ve scheduled or are involved in.'),
        },
    ]

    const handleEmailNotificationOptionChange = async (values) => {
        const newData = cloneDeep(data)
        newData.notification = values
        mutate(newData, false)

        await apiUpdateSettingNotifications(newData)
    }

    const handleEmailNotificationOptionCheckAll = async (value) => {
        const newData = cloneDeep(data)
        if (value) {
            newData.notification = [
                'new_subscriber',
                'platform_updates',
                'tips',
                'event_reminder',
            ]
        } else {
            newData.notification = []
        }

        mutate(newData, false)

        await apiUpdateSettingNotifications(newData)
    }

    return (
        <div>
            <h4>{t('Notification')}</h4>
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
                        <h5>{t('Email notification')}</h5>
                        <p>
                            {t('Receive email alerts for important updates and activity on your account.')}
                        </p>
                    </div>
                    <div>
                        <Switcher
                            checked={data?.notification?.length > 0}
                            onChange={handleEmailNotificationOptionCheckAll}
                        />
                    </div>
                </div>

                {data?.notification && (
                    <Checkbox.Group
                        vertical
                        className="flex flex-col gap-6"
                        value={data?.notification}
                        onChange={handleEmailNotificationOptionChange}
                    >
                        {emailNotificationOption.map((option, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="mt-1.5">
                                    <Checkbox value={option.value}/>
                                </div>
                                <div>
                                    <h6>{option.label}</h6>
                                    <p>{option.desc}</p>
                                </div>
                            </div>
                        ))}
                    </Checkbox.Group>
                )}

            </div>
        </div>
    )
}

export default SettingsNotification
