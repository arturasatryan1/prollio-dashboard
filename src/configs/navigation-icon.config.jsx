import {PiArrowsInDuotone, PiBagSimpleDuotone, PiBookBookmarkDuotone, PiBookOpenUserDuotone,} from 'react-icons/pi'
import {FiHome, FiSettings, FiBarChart2, FiUser} from 'react-icons/fi'

import {RiBroadcastLine, RiCalendarEventLine, RiCustomerService2Line, RiQuestionLine, RiUserSmileLine} from 'react-icons/ri'
import {FaUsers} from 'react-icons/fa'
import {MdOutlinePayments} from 'react-icons/md'


const navigationIcon = {
    home: <FiBarChart2/>,
    channel: <RiBroadcastLine/>,
    calendar: <RiCalendarEventLine/>,
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
