import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import {Controller, useFormContext} from 'react-hook-form'
import DateTimepicker from "@/components/ui/DatePicker/DateTimepicker.jsx";
import Input from "@/components/ui/Input/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";
import dayjs from "dayjs";
import React, {useEffect} from "react";
import {Checkbox} from "@/components/ui/index.js";
import {Link} from "react-router";

const ScheduleSection = ({ control, errors, watch, setValue }) => {

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

    return (
        <Card>
            <h6 className="mb-6">{t('Schedule & Pricing')}</h6>
            <div className="">
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
                                <span className={'text-xs'}>{t('If checked, event details will be posted to the Telegram channel.')}</span>
                            </Checkbox>
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default ScheduleSection
