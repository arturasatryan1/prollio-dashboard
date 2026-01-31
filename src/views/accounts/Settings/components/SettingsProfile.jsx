import {useEffect, useMemo} from 'react'
import Button from '@/components/ui/Button'
import Upload from '@/components/ui/Upload'
import Input from '@/components/ui/Input'
import {Option as DefaultOption} from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import {Form, FormItem} from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import {countryList} from '@/constants/countries.constant'
import {components} from 'react-select'
import {apiGetSettingsProfile, apiUpdateSettingProfile} from '@/services/AccontsService'
import useSWR from 'swr'
import {zodResolver} from '@hookform/resolvers/zod'
import {Controller, useForm} from 'react-hook-form'
import {nullable, z} from 'zod'
import {HiOutlineUser} from 'react-icons/hi'
import {TbPlus} from 'react-icons/tb'
import toast from '@/components/ui/toast/index.js'
import Notification from '@/components/ui/Notification/index.jsx'
import useTranslation from '@/utils/hooks/useTranslation.js'

const {Control} = components

// Zod validation schema
const validationSchema = z.object({
    first_name: z.string().min(1, {message: 'First name required'}),
    last_name: z.string().min(1, {message: 'Last name required'}),
    email: z
        .string()
        .min(1, {message: 'Email required'})
        .email({message: 'Invalid email'}),
    phone: z.string().min(1, {message: 'Please input your mobile number'}),
    avatar: z.string().optional().nullable(),
    // Optional fields (uncomment if needed)
    // dialCode: z.string().min(1, { message: 'Please select your country code' }).optional(),
    // country: z.string().min(1, { message: 'Please select a country' }).optional(),
    // address: z.string().min(1, { message: 'Address required' }).optional(),
    // postcode: z.string().min(1, { message: 'Postcode required' }).optional(),
    // city: z.string().min(1, { message: 'City required' }).optional(),
})

// Custom Select Option with avatar
const CustomSelectOption = (props) => (
    <DefaultOption
        {...props}
        customLabel={(data, label) => (
            <span className="flex items-center gap-2">
        <Avatar shape="circle" size={20} src={`/img/countries/${data.value}.png`}/>
                {props.variant === 'country' && <span>{label}</span>}
                {props.variant === 'phone' && <span>{data.dialCode}</span>}
      </span>
        )}
    />
)

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
    const {data, mutate} = useSWR('/api/settings/profile/', apiGetSettingsProfile, {
        revalidateOnFocus: false,
    })

    const {t} = useTranslation()

    const dialCodeList = useMemo(() => {
        return countryList.map((country) => ({...country, label: country.dialCode}))
    }, [])

    const beforeUpload = (files) => {
        const allowedFileType = ['image/jpeg', 'image/png']
        for (const file of files || []) {
            if (!allowedFileType.includes(file.type)) {
                return 'Please upload a .jpeg or .png file!'
            }
        }
        return true
    }

    const {
        handleSubmit,
        reset,
        control,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            avatar: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
        },
    })

    // Reset form when data loads
    useEffect(() => {
        if (data) reset(data)
    }, [data, reset])

    const onSubmit = async (values) => {
        try {
            const resp = await apiUpdateSettingProfile(values)
            if (resp) {
                mutate({...data, ...values}, false)
                toast.push(<Notification type="success">{t('Successfully updated')}</Notification>, {
                    placement: 'top-center',
                })
            }
        } catch (err) {
            // Show all errors nicely
            const message =
                err?.response?.data?.message ||
                (err.errors
                    ? err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
                    : err.toString())
            toast.push(<Notification type="danger">{message}</Notification>, {placement: 'top-center'})
        }
    }

    return (
        <>
            <h5 className="mb-8">{t('Personal information')}</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Avatar upload */}
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
                                            if (files.length) {
                                                const reader = new FileReader()
                                                reader.onloadend = () => field.onChange(reader.result)
                                                reader.readAsDataURL(files[0])
                                            } else {
                                                field.onChange('')
                                            }
                                        }}
                                    >
                                        <Button variant="solid" size="sm" type="button" icon={<TbPlus/>}>
                                            {t('Upload')}
                                        </Button>
                                    </Upload>
                                    <Button size="sm" type="button" onClick={() => field.onChange('')}>
                                        {t('Remove')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    />
                </div>

                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label={t('First name')}
                        invalid={!!errors.first_name}
                        errorMessage={errors.first_name?.message}
                    >
                        <Controller
                            name="first_name"
                            control={control}
                            render={({field}) => <Input {...field} placeholder={t('First name')}/>}
                        />
                    </FormItem>
                    <FormItem
                        label={t('Last name')}
                        invalid={!!errors.last_name}
                        errorMessage={errors.last_name?.message}
                    >
                        <Controller
                            name="last_name"
                            control={control}
                            render={({field}) => <Input {...field} placeholder={t('Last name')}/>}
                        />
                    </FormItem>
                </div>

                <FormItem label={t('Email')} invalid={!!errors.email} errorMessage={errors.email?.message}>
                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => <Input {...field} placeholder={t('Email')}/>}
                    />
                </FormItem>

                {/* Phone */}
                <div className="flex items-end gap-4 w-full mb-6">
                    <FormItem label={t('Phone')} className="w-full" invalid={!!errors.phone}
                              errorMessage={errors.phone?.message}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({field}) => (
                                <NumericInput autoComplete="off" placeholder={t('Phone Number')} {...field} />
                            )}
                        />
                    </FormItem>
                </div>

                <div className="flex justify-end">
                    <Button variant="solid" type="submit" loading={isSubmitting}>
                        {t('Save')}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SettingsProfile
