import Menu from '@/components/ui/Menu'
import ScrollBar from '@/components/ui/ScrollBar'
import { useSettingsStore } from '../store/settingsStore'
import useQuery from '@/utils/hooks/useQuery'
import {
    TbUserSquare,
    TbLock,
    TbBell,
    TbFileDollar,
    TbRefreshDot,
} from 'react-icons/tb'
import {AiOutlineDollar} from "react-icons/ai";
import useTranslation from "@/utils/hooks/useTranslation.js";

const { MenuItem } = Menu

export const SettingsMenu = ({ onChange }) => {
    const query = useQuery()
    const {t} = useTranslation()

    const { currentView, setCurrentView } = useSettingsStore()

    const currentPath = query.get('category') || query.get('label') || 'inbox'

    const menuList = [
        { label: t('Personal'), value: 'profile', icon: <TbUserSquare /> },
        { label: t('Security'), value: 'security', icon: <TbLock /> },
        { label: t('Notification'), value: 'notification', icon: <TbBell /> },
        { label: t('Billing'), value: 'billing', icon: <TbFileDollar /> },
        { label: t('Bank Account Setup'), value: 'business', icon: <AiOutlineDollar /> },
        // { label: 'Integration', value: 'integration', icon: <TbRefreshDot /> },
    ]

    const handleSelect = (value) => {
        setCurrentView(value)
        onChange?.()
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <ScrollBar className="h-full overflow-y-auto">
                <Menu className="mx-2 mb-10">
                    {menuList.map((menu) => (
                        <MenuItem
                            key={menu.value}
                            eventKey={menu.value}
                            className={`mb-2 ${
                                currentView === menu.value
                                    ? 'bg-gray-100 dark:bg-gray-700'
                                    : ''
                            }`}
                            isActive={currentPath === menu.value}
                            onSelect={() => handleSelect(menu.value)}
                        >
                            <span className="text-2xl ltr:mr-2 rtl:ml-2">
                                {menu.icon}
                            </span>
                            <span className={'truncate'}>{menu.label}</span>
                        </MenuItem>
                    ))}
                </Menu>
            </ScrollBar>
        </div>
    )
}

export default SettingsMenu
