import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { FormItem } from '@/components/ui/Form'
import { countryList } from '@/constants/countries.constant'
import { Controller } from 'react-hook-form'
import { components } from 'react-select'

const { Control } = components

const CustomSelectOption = (props) => {
    return (
        <DefaultOption
            {...props}
            customLabel={(data) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    <span>{data.dialCode}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </Control>
    )
}

const OverviewSection = ({ control, errors }) => {
    const dialCodeList = useMemo(() => {
        const newCountryList = JSON.parse(JSON.stringify(countryList))

        return newCountryList.map((country) => {
            country.label = country.dialCode
            return country
        })
    }, [])

    return (
        <Card>
            <h4 className="mb-6">Channel</h4>
            <div className="grid md:grid-cols-1 gap-4">
                <FormItem
                    label="Name"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Channel Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Description"
                    invalid={Boolean(errors.description)}
                    errorMessage={errors.description?.message}
                >
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Input
                                textArea
                                type="text"
                                autoComplete="off"
                                placeholder="Describe your channal"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default OverviewSection
