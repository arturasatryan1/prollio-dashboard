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
import useTranslation from "@/utils/hooks/useTranslation.js";
import {useLocaleStore} from "@/store/localeStore.js";

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
        dow: 1,
        doy: 4
    },
    buttonText: {
        today: 'Այսօր',
        month: 'Ամիս',
        week: 'Շաբաթ',
        day: 'Օր',
        list: 'Ցանկ'
    },
    // titleFormat: {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // },
    allDayText: 'Օրը',
    noEventsText: 'Միջոցառումներ չկան',
    firstDay: 1,
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
const WEEKDAYS_HY_SHORT = ['Կիր', 'Երկ', 'Երք', 'Չրք', 'Հնգ', 'Ուրբ', 'Շբթ'];

const CalendarView = (props) => {

    const {t} = useTranslation()
    const locale = useLocaleStore()
    const currentLang = locale?.currentLang;
    const {
        wrapperClass,
        events,
        eventClick,
        eventColors = () => defaultColorList,
        ...rest
    } = props

    const now = dayjs();

    const upcomingEvents = (events || []).filter(event =>
        dayjs(event.start).isAfter(now)
    );

    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
        const pastDaysOfYear = (date - firstDayOfYear + 86400000) / 86400000
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
    }

    return (
        <div className={classNames('calendar', wrapperClass)}>
            <div className="grid grid-cols-10">
                <div className="col-span-2 hidden md:block">
                    <div className="pr-5">
                        <h6 className="my-4">{t('Instructions')}</h6>
                        <Timeline>
                            <Timeline.Item>
                                {t('Select dates, and you will be prompted to create a new event')}
                            </Timeline.Item>
                            <Timeline.Item>
                                {t('Click on any event to view details, or cancel it.')}
                            </Timeline.Item>
                            <Timeline.Item>
                                {t('Easily switch the calendar to see the month, week, or day')}
                            </Timeline.Item>
                        </Timeline>

                        <h6 className=" my-4">{t('Upcoming Events')}</h6>
                        {
                            !upcomingEvents?.length && <p>{t('No Upcoming Events')}</p>
                        }
                        <div className="overflow-y-auto space-y-2" style={{maxHeight: 'calc(100vh - 470px)'}}>
                            {upcomingEvents?.map((event, idx) => (
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
                                            <FiClock className="text-gray-400" size={14}/>
                                            {dayjs(event.start).format('MMM DD, HH:mm')}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-10 md:col-span-8">
                    <FullCalendar
                        initialView="dayGridMonth"
                        dayHeaderContent={
                            currentLang === 'hy'
                                ? (args) => {
                                    const date = args.date;
                                    const isArmenian = currentLang === 'hy';
                                    let weekday = WEEKDAYS_HY_SHORT[date.getDay()];

                                    if (isArmenian && args.view.type === 'timeGridWeek') {
                                        const date = args.date;
                                        const weekNumber = getWeekNumber(date);

                                        return {
                                            html: `<div>${weekday}</div><div style="font-size: 0.75em; color: gray;">Շբթ ${weekNumber}</div>`
                                        };
                                    } else if (isArmenian && args.view.type === 'timeGridDay') {
                                        return {
                                            html: `<div>${WEEKDAYS_HY[date.getDay()]}</div>`
                                        };
                                    }


                                    return {
                                        html: `<div>${weekday}</div>`
                                    };
                                }
                                : undefined
                        }
                        // datesSet={(info) => {
                        //     const viewType = info.view.type
                        //     const start = dayjs(info.start)
                        //     const end = dayjs(info.end).subtract(1, 'day')
                        //
                        //     let title = ''
                        //
                        //     if (viewType === 'dayGridMonth' || viewType === 'timeGridWeek') {
                        //         const startMonth = start.format('MMMM')
                        //         const endMonth = end.format('MMMM')
                        //         const year = end.format('YYYY')
                        //
                        //         if (startMonth === endMonth) {
                        //             title = `${startMonth} ${start.format('D')} - ${end.format('D')}, ${year} թ․`
                        //         } else {
                        //             title = `${start.format('D MMMM')} - ${end.format('D MMMM')}, ${year} թ․`
                        //         }
                        //     } else if (viewType === 'timeGridDay') {
                        //         title = `${start.format('D MMMM')}, ${start.format('YYYY')} թ․`
                        //     }
                        //
                        //     setTimeout(() => {
                        //         const el = document.querySelector('.fc-toolbar-title')
                        //         if (el) el.textContent = title
                        //     }, 0)
                        // }}
                        locale={currentLang === 'hy' ? fullArmenianLocale : null}
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
                            hour12: false,
                        }}
                        headerToolbar={{
                            left: '',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next',
                        }}
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
