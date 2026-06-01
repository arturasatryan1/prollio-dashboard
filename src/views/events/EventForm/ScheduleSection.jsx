import Card from '@/components/ui/Card'
import {FormItem} from '@/components/ui/Form'
import {Controller} from 'react-hook-form'
import DateTimepicker from "@/components/ui/DatePicker/DateTimepicker.jsx";
import Input from "@/components/ui/Input/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";
import dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/index.js";
// Segment removed from UI; replaced by a checkbox
import Radio from "@/components/ui/Radio";

const ScheduleSection = ({control, errors, watch, setValue}) => {
    // sync access type/duration with the form so they are submitted to the server
    const accessWatch = watch('isTimed')
    const durationWatch = watch('duration')

    const [isTimed, setIsTimed] = useState(accessWatch ?? false)
    const [selectedDuration, setSelectedDuration] = useState(
        typeof durationWatch !== 'undefined' ? durationWatch : (accessWatch ? 1 : undefined)
    )

    const {t} = useTranslation()

    const minDate = dayjs(new Date())
        .startOf('day')
        .toDate()

    const start = watch('start')

    useEffect(() => {
        if (start) {
            const newEnd = dayjs(start).add(1, 'hour').toDate()
            setValue('end', newEnd)
        }
    }, [start, setValue])

    // Keep local state in sync if form values change externally
    useEffect(() => {
        if (typeof accessWatch !== 'undefined' && accessWatch !== isTimed) {
            setIsTimed(accessWatch)
        }
    }, [accessWatch])

    useEffect(() => {
        if (typeof durationWatch !== 'undefined' && durationWatch !== selectedDuration) {
            setSelectedDuration(durationWatch)
        }
    }, [durationWatch])

    // no defineCustomAccess state anymore; single checkbox toggles member vs event access

    // Whenever local selection changes, write it back to the form values
    useEffect(() => {
        setValue('isTimed', isTimed)
    }, [isTimed, setValue])

    // removed syncing for defineCustomAccess

    useEffect(() => {
        // Only set duration when access is timed. Otherwise clear it so it won't be sent.
        if (!isTimed) {
            setValue('duration', undefined)
        } else {
            setValue('duration', selectedDuration)
        }
    }, [selectedDuration, isTimed, setValue])

    return (
        <Card>

            {/* Start/End should be visible always (UX change) */}
            <div className="mb-6">
                <FormItem
                    label={t('Start Time')}
                    invalid={Boolean(errors.start)}
                >
                    <Controller
                        name="start"
                        control={control}
                        render={({field}) => (
                            <DateTimepicker
                                amPm={false}
                                value={field.value}
                                onChange={field.onChange}
                                minDate={minDate}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t('End Time')}
                    invalid={Boolean(errors.end)}
                    errorMessage={errors.end?.message}
                >
                    <Controller
                        name="end"
                        control={control}
                        render={({field}) => (
                            <DateTimepicker
                                amPm={false}
                                value={field.value}
                                onChange={field.onChange}
                                minDate={start || minDate}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <FormItem label={''}>
                <Checkbox
                    checked={isTimed}
                    onChange={(checked) => {
                        setIsTimed(checked)
                        if (checked) {
                            if (typeof selectedDuration === 'undefined' || selectedDuration === null) {
                                setSelectedDuration(1)
                            }
                        } else {
                            setSelectedDuration(undefined)
                            setValue('duration', undefined)
                        }
                    }}
                >
                    <span className="text-sm">{t('Setting access duration')}</span>
                </Checkbox>
            </FormItem>

            {/* short label above, description shown when enabled */}
            {isTimed && (
                <div className="text-xs text-muted mb-4">
                    {t('Member access (granted to members for the selected duration regardless of the event\'s end; otherwise, access will be revoked once the event ends).')}
                </div>
            )}

            {/* Duration options: only visible when access is member-based */}
            {isTimed && (
                <div className="mb-6">
                    <FormItem label={''}>
                        <Radio.Group
                            vertical
                            className="flex flex-col gap-4"
                            value={selectedDuration}
                            onChange={(value) => setSelectedDuration(value)}
                        >
                            <div className="flex gap-4">
                                {(() => {
                                    const durationOptions = [
                                        {value: 1, title: t('1 day')},
                                        {value: 5, title: t('5 days')},
                                        {value: 10, title: t('10 days')},
                                        {value: 30, title: t('1 Month')},
                                        {value: 90, title: t('3 Months')},
                                        {value: 180, title: t('6 Months')}
                                    ]

                                    const left = durationOptions.slice(0, Math.ceil(durationOptions.length / 2))
                                    const right = durationOptions.slice(Math.ceil(durationOptions.length / 2))

                                    return (
                                        <>
                                            <div>
                                                {left.map((opt) => (
                                                    <div className="py-1 px-2" key={opt.value}>
                                                        <Radio value={opt.value} title={opt.title} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                {right.map((opt) => (
                                                    <div className="py-1 px-2" key={opt.value}>
                                                        <Radio value={opt.value} title={opt.title} />
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )
                                })()}
                            </div>
                        </Radio.Group>
                    </FormItem>
                </div>
            )}
            <hr className="my-8"/>
            <div></div>
            <FormItem
                label={t('Price')}
                invalid={Boolean(errors.price)}
            >
                <Controller
                    name="price"
                    control={control}
                    render={({field}) => (
                        <Input
                            type="number"
                            autoComplete="off"
                            placeholder={t('Set price')}
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label={t('Publish to channel')}
                invalid={Boolean(errors.notify)}
            >
                <Controller
                    name="publish"
                    control={control}
                    render={({field}) => (
                        <Checkbox
                            {...field}
                        >
                            <span
                                className={'text-xs'}>{t('If checked, event details will be posted to the Telegram channel.')}</span>
                        </Checkbox>
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default ScheduleSection
