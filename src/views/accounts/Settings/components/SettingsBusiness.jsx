import {useEffect, useState} from 'react'
import Button from '@/components/ui/Button'
import {useNavigate} from 'react-router'
import Card from "@/components/ui/Card/index.jsx";
import {Form, FormItem} from "@/components/ui/Form/index.jsx";
import {Controller, useForm} from "react-hook-form";
import Select, {Option as DefaultOption} from '@/components/ui/Select'
import Input from "@/components/ui/Input/index.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Avatar} from "@/components/ui/index.js";

import {components} from 'react-select'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {apiExpertBankAccountSetup, apiGetExpertBankAccount} from "@/services/ExpertService.js";
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import useSWR from "swr";
import {useSessionUser} from "@/store/authStore.js";
import {apiGetSettingsProfile} from "@/services/AccontsService.js";

const {Control} = components

const validationSchema = z.object({
    holderName: z.string().min(1, ''),
    bankName: z.string().min(1, ''),
    accountNumber: z.string().min(1, ''),
})

const banks = [
    {
        label: "ACBA-Credit Agricole Bank",
        value: "acba",
    },
    {label: "Ameriabank", value: "ameriabank"},
    {label: "Araratbank", value: "araratbank"},
    {label: "Ardshinbank", value: "ardshinbank"},
    {label: "Amio Bank", value: "amio"},
    {label: "ArmSwissBank", value: "armswissbank"},
    {label: "Artsakhbank", value: "artsakhbank"},
    {label: "Byblos Bank Armenia", value: "byblos"},
    {label: "Converse Bank", value: "converse"},
    {label: "Evocabank", value: "evocabank"},
    {label: "Fast Bank", value: "fastbank"},
    {label: "Ardshininvest Bank", value: "ardshininvest"},
    {label: "Inecobank", value: "inecobank"},
    {label: "Mellat Bank", value: "mellat"},
    {label: "Unibank", value: "unibank"},
    {label: "VTB Armenia", value: "vtb"},
    {label: "IDBank", value: "idbank"}
];

const SettingsBusiness = () => {
    const [isSubmitting, setSubmitting] = useState(false)
    const setUser = useSessionUser((state) => state.setUser)

    const {t} = useTranslation()

    const {
        data = null,
    } = useSWR('/api/dashboard/experts/bank-account/get', () => apiGetExpertBankAccount(), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    })

    const {
        handleSubmit,
        formState: {errors},
        control,
        reset,
    } = useForm({
        defaultValues: {
            holderName: '',
            bankName: '',
            accountNumber: '',
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (data) {
            reset({
                holderName: data.holder_name || '',
                bankName: data.bank_name || '',
                accountNumber: data.account_number || '',
            });
        }
    }, [data, reset]);

    const onSubmit = async (values) => {
        if (isSubmitting) return

        setSubmitting(true)

        try {
            const res = await apiExpertBankAccountSetup({
                bank_name: values.bankName,
                holder_name: values.holderName,
                account_number: values.accountNumber,
            })

            if (res) {
                toast.push(
                    <Notification type="success">{t('Your bank account information has been saved successfully')}</Notification>,
                    { placement: 'top-center' },
                )

                const userRes = await apiGetSettingsProfile()

                if (userRes) {
                    setUser(userRes)
                }
            }

        } catch (errors) {
            toast.push(
                <Notification type="danger">{t(errors?.response?.data?.message)}</Notification>,
                {placement: 'top-center'},
            )
        } finally {
            setSubmitting(false)
        }

    }

    const CustomControl = ({
                               children,
                               ...props
                           }) => {
        const selected = props.getValue()[0]
        return (
            <Control {...props}>
                {selected && (
                    <Avatar
                        className="ltr:ml-4 rtl:mr-4"
                        shape="circle"
                        size={18}
                        src={selected.imgPath}/>
                )}
                {children}
            </Control>
        );
    }

    const CustomSelectOption = (props) => {

        return (
            <DefaultOption
                {...props}
                customLabel={(data, label) => (
                    <span className="ml-2 rtl:mr-2">{label}</span>
                )}/>
        );
    }


    return (
        <div className={'gap-4'}>
            <Card>
                <h4 className="mb-4">{t('Bank Account Setup')}</h4>
                <div className="grid grid-cols-10 gap-10">
                    <Form onSubmit={handleSubmit(onSubmit)} className="mt-8 col-span-5">
                        <p className="text-sm text-gray-500 mb-6">
                            {t('Enter your bank account information to receive earnings. Please make sure the information is accurate.')}
                        </p>

                        <FormItem
                            label={t('Account Holder Name')}
                            invalid={Boolean(errors.holderName)}
                        >
                            <Controller
                                name="holderName"
                                control={control}
                                render={({field}) => (
                                    <Input
                                        placeholder="e.g. Artur Asatryan"
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label={t('Bank Name')}
                            invalid={Boolean(errors.bankName)}
                        >
                            <Controller
                                name="bankName"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        searchable
                                        options={banks}
                                        // components={{
                                        //     Option: CustomSelectOption,
                                        //     Control: CustomControl,
                                        // }}
                                        value={banks?.filter((option) => option.value === field.value)}
                                        placeholder={t('Select Bank')}
                                        onChange={(selected) => {
                                            field.onChange(selected?.value)
                                        }}
                                    />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label={t('Bank Account Number')}
                            invalid={Boolean(errors.accountNumber)}
                        >
                            <Controller
                                name="accountNumber"
                                control={control}
                                render={({field}) => (
                                    <Input placeholder="e.g. 123456789012345678" {...field} />
                                )}
                            />
                        </FormItem>

                        {/*<FormItem*/}
                        {/*    label={t('SWIFT / BIC Code')}*/}
                        {/*    invalid={Boolean(errors.swift)}*/}
                        {/*>*/}
                        {/*    <Controller*/}
                        {/*        name="swift"*/}
                        {/*        control={control}*/}
                        {/*        render={({field}) => (*/}
                        {/*            <Input placeholder={`${t('e.g.')} HSBKAM22`} {...field} />*/}
                        {/*        )}*/}
                        {/*    />*/}
                        {/*</FormItem>*/}

                        <FormItem>
                            <Button block loading={isSubmitting} variant="solid" type="submit">
                                {t('Save')}
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    )
}

export default SettingsBusiness
