import {
    PiArrowsInDuotone,
    PiBagSimpleDuotone,
    PiBookBookmarkDuotone,
    PiBookOpenUserDuotone, PiCalendarDuotone,
    PiChartBarDuotone, PiRocketDuotone, PiUsersDuotone,
} from 'react-icons/pi'
import {FiSettings, FiUser} from 'react-icons/fi'
import {RiBroadcastLine, RiCalendarEventLine, RiCustomerService2Line, RiQuestionLine} from 'react-icons/ri'
import {FaUsers} from 'react-icons/fa'
import {MdOutlinePayments} from 'react-icons/md'

const navigationIcon = {
    overview: <PiChartBarDuotone/>,
    experts: <PiUsersDuotone />,
    channel: <PiRocketDuotone/>,
    calendar: <PiCalendarDuotone/>,
    users: <FaUsers/>,
    profile: <FiUser/>,
    dollar: <MdOutlinePayments/>,
    setting: <FiSettings/>,
    support: <RiCustomerService2Line/>,
    question: <RiQuestionLine/>,
    collapseMenu: <PiArrowsInDuotone/>,
    groupSingleMenu: <PiBookOpenUserDuotone/>,
    groupCollapseMenu: <PiBookBookmarkDuotone/>,
    groupMenu: <PiBagSimpleDuotone/>,
}

export default navigationIcon
