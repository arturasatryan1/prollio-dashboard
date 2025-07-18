import Segment from '@/components/ui/Segment'
import {TbCheck, TbClock, TbUserCircle, TbUsers} from 'react-icons/tb'
import { useChatStore } from '../store/chatStore'
import useTranslation from "@/utils/hooks/useTranslation.js";

const ChatSegment = () => {
    const selectedChatType = useChatStore((state) => state.selectedChatType)
    const setSelectedChatType = useChatStore(
        (state) => state.setSelectedChatType,
    )

    const {t} = useTranslation();

    return (
        <Segment
            className="w-full"
            value={selectedChatType}
            onChange={(value) => setSelectedChatType(value)}
        >
            <Segment.Item className="flex-1" value="draft">
                <div className="flex items-center justify-center gap-2">
                    <TbClock className="text-xl" />
                    <span>{t('Drafts')}</span>
                </div>
            </Segment.Item>
            <Segment.Item className="flex-1" value="sent">
                <div className="flex items-center justify-center gap-2">
                    <TbCheck className="text-xl" />
                    <span>{t('Sent')}</span>
                </div>
            </Segment.Item>
        </Segment>
    )
}

export default ChatSegment
