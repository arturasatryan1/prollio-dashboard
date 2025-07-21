import {useEffect, useMemo} from 'react'
import Button from '@/components/ui/Button'
import Upload from '@/components/ui/Upload'
import Input from '@/components/ui/Input'
import Select, {Option as DefaultOption} from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import {Form, FormItem} from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import {countryList} from '@/constants/countries.constant'
import {components} from 'react-select'
import {apiGetSettingsProfile, apiUpdateSettingProfile} from '@/services/AccontsService'
import useSWR from 'swr'
import {zodResolver} from '@hookform/resolvers/zod'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'
import {HiOutlineUser} from 'react-icons/hi'
import {TbPlus} from 'react-icons/tb'
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";

const {Control} = components

const validationSchema = z.object({
    first_name: z.string().min(1, {message: 'First name required'}),
    last_name: z.string().min(1, {message: 'Last name required'}),
    email: z
        .string()
        .min(1, {message: 'Email required'})
        .email({message: 'Invalid email'}),
    // dialCode: z.string().min(1, {message: 'Please select your country code'}),
    phone: z
        .string()
        .min(1, {message: 'Please input your mobile number'}),
    // country: z.string().min(1, {message: 'Please select a country'}),
    // address: z.string().min(1, {message: 'Addrress required'}),
    // postcode: z.string().min(1, {message: 'Postcode required'}),
    // city: z.string().min(1, {message: 'City required'}),
    avatar: z.string()
})

const CustomSelectOption = (props) => {
    return (
        <DefaultOption
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    {props.variant === 'country' && <span>{label}</span>}
                    {props.variant === 'phone' && <span>{data.dialCode}</span>}
                </span>
            )}
        />
    )
}

const CustomControl = ({children, ...props}) => {
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

const SettingsProfile = () => {
    const {data, mutate} = useSWR(
        '/api/settings/profile/',
        () => apiGetSettingsProfile(),
        {
            revalidateOnFocus: false,
        },
    )

    const {t} = useTranslation();

    const dialCodeList = useMemo(() => {
        const newCountryList = JSON.parse(JSON.stringify(countryList))

        return newCountryList.map((country) => {
            country.label = country.dialCode
            return country
        })
    }, [])

    const beforeUpload = (files) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }

        return valid
    }

    const {
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (data) {
            reset(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const onSubmit = async (values) => {
        try {
            const resp = await apiUpdateSettingProfile(values)
            if (resp) {
                mutate({...data, ...values}, false)
                toast.push(
                    <Notification type="success">{t('Successfully updated')}</Notification>,
                    { placement: 'top-center' },
                )
            }
        } catch (errors) {
            toast.push(
                <Notification type="danger">{errors?.response?.data?.message || errors.toString()}</Notification>,
                { placement: 'top-center' },
            )
        }
    }

    return (
        <>
            <h5 className="mb-8">{t('Personal information')}</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <Controller
                        name="avatar"
                        control={control}
                        render={({field}) => (
                            <div className="flex items-center gap-4">
                                <Avatar
                                    size={90}
                                    className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                    icon={<HiOutlineUser/>}
                                    src={field.value}
                                />
                                <div className="flex items-center gap-2">
                                    <Upload
                                        showList={false}
                                        uploadLimit={1}
                                        beforeUpload={beforeUpload}
                                        onChange={(files) => {
                                            if (files.length > 0) {
                                                const reader = new FileReader()

                                                reader.onloadend = () => {
                                                    field.onChange(reader.result)
                                                }

                                                reader.readAsDataURL(files[0])
                                            }
                                        }}
                                    >
                                        <Button
                                            variant="solid"
                                            size="sm"
                                            type="button"
                                            icon={<TbPlus/>}
                                        >
                                            {t('Upload')}
                                        </Button>
                                    </Upload>
                                    <Button
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            field.onChange('')
                                        }}
                                    >
                                        {t('Remove')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label={t('First name')}
                        invalid={Boolean(errors.first_name)}
                        errorMessage={errors.first_name?.message}
                    >
                        <Controller
                            name="first_name"
                            control={control}
                            render={({field}) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder={t('First name')}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label={t('Last name')}
                        invalid={Boolean(errors.last_name)}
                        errorMessage={errors.last_name?.message}
                    >
                        <Controller
                            name="last_name"
                            control={control}
                            render={({field}) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder={t('Last name')}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <FormItem
                    label={t('Email')}
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => (
                            <Input
                                type="email"
                                autoComplete="off"
                                placeholder={t('Email')}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <div className="flex items-end gap-4 w-full mb-6">
                    {/*<FormItem*/}
                    {/*    invalid={*/}
                    {/*        Boolean(errors.phoneNumber) ||*/}
                    {/*        Boolean(errors.dialCode)*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    <label className="form-label mb-2">Phone number</label>*/}
                    {/*    <Controller*/}
                    {/*        name="dialCode"*/}
                    {/*        control={control}*/}
                    {/*        render={({ field }) => (*/}
                    {/*            <Select*/}
                    {/*                options={dialCodeList}*/}
                    {/*                {...field}*/}
                    {/*                className="w-[150px]"*/}
                    {/*                components={{*/}
                    {/*                    Option: (props) => (*/}
                    {/*                        <CustomSelectOption*/}
                    {/*                            variant="phone"*/}
                    {/*                            {...props}*/}
                    {/*                        />*/}
                    {/*                    ),*/}
                    {/*                    Control: CustomControl,*/}
                    {/*                }}*/}
                    {/*                placeholder=""*/}
                    {/*                value={dialCodeList.filter(*/}
                    {/*                    (option) =>*/}
                    {/*                        option.dialCode === field.value,*/}
                    {/*                )}*/}
                    {/*                onChange={(option) =>*/}
                    {/*                    field.onChange(option?.dialCode)*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</FormItem>*/}
                    <FormItem
                        label={t('Phone')}
                        className="w-full"
                        invalid={
                            Boolean(errors.phone) ||
                            Boolean(errors.phone)
                        }
                        errorMessage={errors.phone?.message}
                    >
                        <Controller
                            name="phone"
                            control={control}
                            render={({field}) => (
                                <NumericInput
                                    autoComplete="off"
                                    placeholder={t('Phone Number')}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                {/*<h4 className="mb-6">Address information</h4>*/}
                {/*<FormItem*/}
                {/*    label="Country"*/}
                {/*    invalid={Boolean(errors.country)}*/}
                {/*    errorMessage={errors.country?.message}*/}
                {/*>*/}
                {/*    <Controller*/}
                {/*        name="country"*/}
                {/*        control={control}*/}
                {/*        render={({field}) => (*/}
                {/*            <Select*/}
                {/*                options={countryList}*/}
                {/*                {...field}*/}
                {/*                components={{*/}
                {/*                    Option: (props) => (*/}
                {/*                        <CustomSelectOption*/}
                {/*                            variant="country"*/}
                {/*                            {...props}*/}
                {/*                        />*/}
                {/*                    ),*/}
                {/*                    Control: CustomControl,*/}
                {/*                }}*/}
                {/*                placeholder=""*/}
                {/*                value={countryList.filter(*/}
                {/*                    (option) => option.value === field.value,*/}
                {/*                )}*/}
                {/*                onChange={(option) =>*/}
                {/*                    field.onChange(option?.value)*/}
                {/*                }*/}
                {/*            />*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*    label="Address"*/}
                {/*    invalid={Boolean(errors.address)}*/}
                {/*    errorMessage={errors.address?.message}*/}
                {/*>*/}
                {/*    <Controller*/}
                {/*        name="address"*/}
                {/*        control={control}*/}
                {/*        render={({field}) => (*/}
                {/*            <Input*/}
                {/*                type="text"*/}
                {/*                autoComplete="off"*/}
                {/*                placeholder="Address"*/}
                {/*                {...field}*/}
                {/*            />*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</FormItem>*/}
                <div className="flex justify-end">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmitting}
                    >
                        {t('Save')}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SettingsProfile
