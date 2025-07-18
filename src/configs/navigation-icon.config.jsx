import {
    PiArrowsInDuotone,
    PiBagSimpleDuotone,
    PiBookBookmarkDuotone,
    PiBookOpenUserDuotone, PiCalendarDuotone,
    PiChartBarDuotone, PiCreditCard, PiPackage, PiQuestionDuotone, PiRocketDuotone, PiUserCircleDuotone, PiUsersDuotone,
} from 'react-icons/pi'
import {FiSettings, FiTrendingUp, FiUser} from 'react-icons/fi'
import {
    RiCustomerService2Line,
    RiQuestionLine
} from 'react-icons/ri'
import {FaRegAddressCard, FaUsers} from 'react-icons/fa'
import {MdOutlinePayments} from 'react-icons/md'
import {AiOutlineClockCircle} from "react-icons/ai";
import {TbRefreshAlert} from "react-icons/tb";
import {BsSend} from "react-icons/bs";

const navigationIcon = {
    overview: <PiChartBarDuotone/>,
    experts: <PiUsersDuotone />,
    channel: <PiRocketDuotone/>,
    calendar: <PiCalendarDuotone/>,
    users: <PiUsersDuotone/>,
    profile: <FiUser/>,
    coin: <MdOutlinePayments/>,
    dollar: <TbRefreshAlert/>,
    setting: <FiSettings/>,
    account: <PiUserCircleDuotone/>,
    pricing: <PiCreditCard />,
    support: <RiCustomerService2Line/>,
    question: <RiQuestionLine/>,
    collapseMenu: <PiArrowsInDuotone/>,
    groupSingleMenu: <PiBookOpenUserDuotone/>,
    groupCollapseMenu: <PiBookBookmarkDuotone/>,
    groupMenu: <PiBagSimpleDuotone/>,
    requests: <FaRegAddressCard/>,
    messages: <BsSend/>,
    event: <AiOutlineClockCircle/>,
    tools: <FiTrendingUp/>,
}

export default navigationIcon
