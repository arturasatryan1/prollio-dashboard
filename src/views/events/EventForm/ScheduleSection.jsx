import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import DateTimepicker from "@/components/ui/DatePicker/DateTimepicker.jsx";
import Input from "@/components/ui/Input/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";

const ScheduleSection = ({ control, errors }) => {

    const {t} = useTranslation()

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
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label={t('End Time')}
                    invalid={Boolean(errors.end)}
                >
                    <Controller
                        name="end"
                        control={control}
                        render={({field}) => (
                            <DateTimepicker
                                amPm={false}
                                value={field.value}
                                onChange={field.onChange}
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
                                placeholder={t('Set price for event')}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default ScheduleSection
