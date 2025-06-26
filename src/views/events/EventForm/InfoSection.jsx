import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import {FormItem} from '@/components/ui/Form'
import {Controller, useFieldArray} from 'react-hook-form'
import Select from "@/components/ui/Select/index.jsx";
import {Button} from "@/components/ui/index.js";
import {TbPlus, TbTrash} from "react-icons/tb";

const InfoSection = ({register, control, errors, channels}) => {
    const {fields, append, remove} = useFieldArray({
        control, name: 'promoCodes',
    })

    return (<Card>
        <h4 className="mb-6">Edit Event</h4>
        <div className="grid md:grid-cols-1 mt-4">
            <FormItem
                label="Title"
                invalid={Boolean(errors.title)}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({field}) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Event title"
                            {...field}
                        />)}
                />
            </FormItem>
            <FormItem
                label="Description"
                invalid={Boolean(errors.description)}
            >
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <Input
                            textArea
                            type="text"
                            autoComplete="off"
                            placeholder="Describe the event"
                            {...field}
                        />)}
                />
            </FormItem>
            <FormItem
                label="Channel"
                invalid={Boolean(errors.channel)}
            >
                <Controller
                    name="channel"
                    control={control}
                    render={({field}) => (
                        <Select
                            placeholder="Select Channel"
                            options={channels}
                            value={channels?.filter((option) => option.value === field.value)}
                            onChange={(selected) => {
                                field.onChange(selected?.value)
                            }}
                        />)}
                />
            </FormItem>
        </div>
        <div className="flex justify-between">
            <h6 className="mb-6">Promo Codes (optional)</h6>
            <Button
                variant="solid"
                size="xs"
                type="button"
                icon={<TbPlus/>}
                onClick={() => append({
                    code: '',
                    discountType: 'percent',
                    discountValue: '', maxUsage: ''
                })}
            />
        </div>
        <div className="gap-4 grid">
            {errors.promoCodes?.unique?.message && (
                <p className="text-red-500">{errors.promoCodes?.unique?.message}</p>
            )}

            {fields.map((item, index) => (
                <Card key={item.id} className={`relative`}>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <FormItem
                            label="Promo Code"
                            invalid={Boolean(errors.promoCodes?.[index]?.code)}
                        >
                            <Input
                                {...register(`promoCodes.${index}.code`)}
                                placeholder="e.g., SAVE10"
                                autoComplete="off"
                            />
                        </FormItem>
                        <FormItem
                            label="Discount Type"
                            invalid={Boolean(errors.promoCodes?.[index]?.discountType)}
                        >
                            <Controller
                                control={control}
                                name={`promoCodes.${index}.discountType`}
                                render={({field}) => (<Select
                                    options={[{value: 'percent', label: 'Percent (%)'}, {
                                        value: 'fixed',
                                        label: 'Fixed Amount (֏)'
                                    },]}
                                    value={field.value === 'fixed' ? {
                                        value: 'fixed',
                                        label: 'Fixed Amount (֏)'
                                    } : {value: 'percent', label: 'Percent (%)'}}
                                    onChange={(selected) => field.onChange(selected.value)}
                                />)}
                            />
                        </FormItem>
                        <FormItem
                            label="Discount Value"
                            invalid={Boolean(errors.promoCodes?.[index]?.discountValue)}
                        >
                            <Input
                                type="number"
                                {...register(`promoCodes.${index}.discountValue`)}
                                placeholder="e.g., 10"
                            />
                        </FormItem>
                        <FormItem label="Max Usage">
                            <Input
                                type="number"
                                {...register(`promoCodes.${index}.maxUsage`)}
                                placeholder="e.g., 100 (optional)"
                            />
                        </FormItem>
                    </div>


                    <Button
                        type="button"
                        size={'xs'}
                        customColorClass={() => 'border-error right-3 top-3 text-error hover:border-error hover:ring-error hover:text-error bg-transparent absolute'}
                        icon={<TbTrash/>}
                        onClick={() => remove(index)}
                    />
                </Card>
            ))}
        </div>
    </Card>)
}

export default InfoSection
