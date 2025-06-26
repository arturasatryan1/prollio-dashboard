import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import DateTimepicker from "@/components/ui/DatePicker/DateTimepicker.jsx";
import Input from "@/components/ui/Input/index.jsx";

const ScheduleSection = ({ control, errors }) => {
    return (
        <Card>
            <h6 className="mb-6">Schedule & Pricing</h6>
            <div className="">
                <FormItem
                    label="Start date"
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
                    label="End date"
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
                    label="Price"
                    invalid={Boolean(errors.price)}
                >
                    <Controller
                        name="price"
                        control={control}
                        render={({field}) => (
                            <Input
                                type="number"
                                autoComplete="off"
                                placeholder="Set price for event"
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
