import {useState} from 'react'
import Drawer from '@/components/ui/Drawer'
import ScrollBar from '@/components/ui/ScrollBar'
import Tabs from '@/components/ui/Tabs'
import {useChatStore} from '../store/chatStore'
import isEmpty from 'lodash/isEmpty'
import {apiGetMessage} from "@/services/MessageService.js";
import useSWR from "swr";
import dayjs from "dayjs";
import useTranslation from "@/utils/hooks/useTranslation.js";
import isLastChild from "@/utils/isLastChild.js";

const {TabNav, TabList, TabContent} = Tabs

const ContactInfoField = ({title, value, icon}) => {
    return (
        <div className="flex items-center gap-4">
            <div className="text-2xl">{icon}</div>
            <div>
                <small className="font-semibold">{title}</small>
                <p className="heading-text font-semibold">{value}</p>
            </div>
        </div>
    )
}

const ContactInfoDrawer = () => {
    const contactInfoDrawer = useChatStore((state) => state.contactInfoDrawer)
    const setContactInfoDrawer = useChatStore((state) => state.setContactInfoDrawer,)

    const [imageGalleryIndex, setImageGalleryIndex] = useState(-1)

    const {t} = useTranslation();

    const {data: messages, isLoading} = useSWR(
        contactInfoDrawer?.id
            ? [`/api/dashboard/messages/${contactInfoDrawer.id}`, contactInfoDrawer.id]
            : null,
        ([_, id]) => apiGetMessage({id}),
        {
            revalidateOnFocus: false,
        }
    );

    const handleDrawerClose = () => {
        setContactInfoDrawer({
            open: false,
        })
    }

    return (
        <Drawer
            title={t('Recipients')}
            closable={true}
            isOpen={contactInfoDrawer.open}
            showBackdrop={false}
            width={400}
            onClose={handleDrawerClose}
            onRequestClose={handleDrawerClose}
        >
            {!isEmpty(messages) && (
                <ScrollBar className="h-[calc(100%-30px)]">
                    {messages?.map((item, idx) => (
                        <div key={item.id} role="button">
                            <div
                                className={`relative rounded-xl flex px-4 py-2 cursor-pointer hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-700`}
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="truncate">
                                        <strong>{item.member.first_name} {item.member.last_name}</strong>
                                        <p className={'mb-1'}>{t('Joined At')}: {' '}{dayjs(item.created_at).format('MMM D, HH:mm')}</p>
                                    </div>
                                </div>

                            </div>
                            {!isLastChild(messages, idx) ? (
                                <div className="border-b border-gray-200 dark:border-gray-700 my-2"/>
                            ) : (
                                ''
                            )}
                            {/*<div className="flex gap-1 items-center">*/}
                            {/*    {statusIcons[item.status] || null}*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </ScrollBar>
            )}
        </Drawer>
    )
}

export default ContactInfoDrawer
