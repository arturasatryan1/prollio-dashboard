import classNames from '@/utils/classNames'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {Card, Timeline} from "@/components/ui/index.js";
import React from "react";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import {FiClock} from "react-icons/fi";
import hyAmLocale from '@fullcalendar/core/locales/hy-am'

dayjs.extend(isSameOrAfter)

const defaultColorList = {
    red: {
        bg: 'bg-[#fbddd9]',
        text: 'text-gray-900',
    },
    orange: {
        bg: 'bg-[#ffc6ab]',
        text: 'text-gray-900',
    },
    yellow: {
        bg: 'bg-[#ffd993]',
        text: 'text-gray-900',
    },
    green: {
        bg: 'bg-[#bee9d3]',
        text: 'text-gray-900',
    },
    blue: {
        bg: 'bg-blue-200',
        text: 'text-gray-900',
    },
    purple: {
        bg: 'bg-[#ccbbfc]',
        text: 'text-gray-900',
    },
}

const fullArmenianLocale = {
    code: 'hy-custom',
    week: {
        dow: 1, // Monday is the first day of the week
        doy: 4, // First week of the year must contain Jan 4th
    },
    buttonText: {
        today: 'Այսօր',
        month: 'Ամիս',
        week: 'Շաբաթ',
        day: 'Օր',
        list: 'Ցանկ',
    },
    weekText: 'ՇԲ',
    allDayText: 'Ամբողջ օրը',
    moreLinkText: 'ավելին',
    noEventsText: 'Միջոցառումներ չկան',
    dayNames: [
        'Կիրակի',
        'Երկուշաբթի',
        'Երեքշաբթի',
        'Չորեքշաբթի',
        'Հինգշաբթի',
        'Ուրբաթ',
        'Շաբաթ',
    ],
    dayNamesShort: [
        'Կիր',
        'Երկ',
        'Երք',
        'Չրք',
        'Հնգ',
        'Ուր',
        'Շբթ',
    ],
}

const statusColor = {
    pending: 'bg-amber-400',
    processing: 'bg-blue-200 dark:bg-blue-300 text-gray-900',
    completed: 'bg-emerald-500',
    failed: 'bg-red-200 dark:bg-red-300 text-gray-900',
    cancelled: 'bg-gray-200 dark:bg-gray-300 text-gray-900',
    refunded: 'bg-purple-200 dark:bg-purple-300 text-gray-900',
};

const WEEKDAYS_HY = ['Կիրակի', 'Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ', 'Շաբաթ'];
const MONTHS_HY = [
    'Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս',
    'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր',
]

const CalendarView = (props) => {

    const {
        wrapperClass,
        events,
        eventClick,
        eventColors = () => defaultColorList,
        ...rest
    } = props

    return (
        <div className={classNames('calendar', wrapperClass)}>
            <div className="grid grid-cols-10">
                <div className="col-span-2">
                    <div className="pr-5">
                        <h6 className="my-4">Instructions</h6>
                        <Timeline>
                            <Timeline.Item>
                                Select dates, and you will be prompted to create a new event
                            </Timeline.Item>
                            <Timeline.Item>
                                Click on any event to view details, make changes, or cancel it.
                            </Timeline.Item>
                            <Timeline.Item>
                                Easily switch between Month, Week, and Day views using the top navigation bar
                            </Timeline.Item>
                        </Timeline>

                        <h6 className=" my-4">Upcoming Events</h6>
                        {
                            !events?.length && <p>No Upcoming Events</p>
                        }
                        <div className="overflow-y-auto space-y-2" style={{maxHeight: 'calc(100vh - 470px)'}}>
                            {events?.map((event, idx) => (
                                <Card
                                    onClick={() => eventClick(event)}
                                    key={idx}
                                    clickable
                                    className="relative hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                                >
                                    {/*<button*/}
                                    {/*    // onClick={() => handleDelete(event.id)}*/}
                                    {/*    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"*/}
                                    {/*    title="Cancel Event"*/}
                                    {/*>*/}
                                    {/*    <FiX size={16} />*/}
                                    {/*</button>*/}

                                    <div>
                                        <p className="heading-text text-md font-semibold text-gray-800">
                                            {event.title}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            Start Time:
                                            <FiClock className="text-gray-400" size={14}/>
                                            {dayjs(event.start).format('MMM DD, HH:mm')}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-8">
                    <FullCalendar
                        initialView="dayGridMonth"
                        // dayHeaderContent={(args) => WEEKDAYS_HY[args.date.getDay()]}
                        // titleFormat={(date) => {
                        //     const monthIndex = date.date.marker.getMonth()
                        //     const year = date.date.marker.getFullYear()
                        //     return `${MONTHS_HY[monthIndex]} ${year}`
                        // }}
                        // locale={fullArmenianLocale}
                        // locale={hyAmLocale}
                        height={700}
                        selectAllow={(selectInfo) => {
                            return dayjs(selectInfo.start).isSameOrAfter(dayjs(), 'day')
                        }}
                        eventAllow={(dropInfo, draggedEvent) => {
                            return dayjs(dropInfo.start).isSameOrAfter(dayjs(), 'day')
                        }}
                        slotLabelFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false, // ⬅️ This is the key for 24-hour format
                        }}
                        headerToolbar={{
                            left: '',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next',
                        }}
                        // dayCellClassNames={(arg) => {
                        //     const classes = []
                        //     if (dayjs(arg.date).isBefore(dayjs(), 'day')) {
                        //         classes.push('fc-day-other')
                        //     }
                        //     return classes
                        // }}
                        eventContent={(arg) => {
                            const {extendedProps} = arg.event
                            const {isEnd, isStart} = arg
                            return (
                                <div
                                    className={classNames(
                                        'custom-calendar-event',
                                        defaultColorList['blue']?.bg,
                                        defaultColorList['blue']?.text,
                                        isEnd &&
                                        !isStart &&
                                        'rounded-tl-none! rounded-bl-none! !rtl:rounded-tr-none !rtl:rounded-br-none',
                                        !isEnd &&
                                        isStart &&
                                        'rounded-tr-none! rounded-br-none! !rtl:rounded-tl-none !rtl:rounded-bl-none',
                                    )}
                                >
                                    {/*{!(isEnd && !isStart) && (*/}
                                    {/*    <span>{arg.timeText}</span>*/}
                                    {/*)}*/}
                                    <span className="font-bold ml-1 rtl:mr-1">
                                          {arg.event.title}
                                    </span>
                                </div>
                            )
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        events={events}
                        eventClick={eventClick}
                        {...rest}
                    />
                </div>
            </div>
        </div>
    )
}

export default CalendarView
