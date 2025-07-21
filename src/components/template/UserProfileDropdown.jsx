import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import { Link } from 'react-router'
import {PiUserDuotone, PiSignOutDuotone, PiGearDuotone, PiPulseDuotone} from 'react-icons/pi'
import { useAuth } from '@/auth'
import useTranslation from "@/utils/hooks/useTranslation.js";
// import {HiChevronDown} from "react-icons/hi";

const dropdownItemList = [
    {
        label: 'Profile',
        path: '/settings/account',
        icon: <PiUserDuotone />,
    },
    // {
    //     label: 'Activity Log',
    //     path: '/account/activity-log',
    //     icon: <PiPulseDuotone />,
    // },
]

const _UserDropdown = () => {
    const { avatar, first_name, last_name, email } = useSessionUser((state) => state.user)

    const { signOut } = useAuth()

    const {t} = useTranslation()
    const handleSignOut = () => {
        signOut()
    }

    const avatarProps = {
        ...(avatar ? { src: avatar } : { icon: <PiUserDuotone /> }),
    }

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer flex items-center">
                    <Avatar size={32} {...avatarProps} />
                    {/*<span className="font-medium ml-2">{first_name}</span>*/}
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <Avatar {...avatarProps} />
                    <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                            {`${first_name} ${last_name}` || 'Anonymous'}
                        </div>
                        <div className="text-xs">
                            {email || 'No email available'}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{t(item.label)}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>{t('Sign Out')}</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
