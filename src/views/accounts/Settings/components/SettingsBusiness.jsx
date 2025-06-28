import {useState} from 'react'
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

const {Control} = components

const validationSchema = z.object({
    holder: z.string().min(1, ''),
    bank: z.string().min(1, ''),
    iban: z.string().min(1, ''),
    swift: z.string().min(1, ''),
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
    const navigate = useNavigate()
    const {t} = useTranslation()

    const [subject, setSubject] = useState('billing')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setSubmitting] = useState(false)

    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues: {
            subject: '',
            message: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values) => {
        if (isSubmitting) return


        console.log(values);
        setSubmitting(true)

        console.log('Contact message sent:', values)

        setTimeout(() => {
            setSubmitted(true)
            setSubmitting(false)
        }, 1000)
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
                    <span className="flex items-center gap-2">
                    <Avatar shape="circle" size={20} src={data.logoUrl || ''}/>
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </span>
                )}/>
        );
    }


    return (
        <div className={'gap-4'}>
            <Card>
                <h4 className="mb-4">{t('Payout Setup')}</h4>
                <div className="grid grid-cols-10 gap-10">
                    <Form onSubmit={handleSubmit(onSubmit)} className="mt-8 col-span-5">
                        <p className="text-sm text-gray-500 mb-6">
                            {t('Enter your bank account information to receive payouts. Please make sure the information is accurate.')}
                        </p>

                        <FormItem
                            label={t('Account Holder Name')}
                            invalid={Boolean(errors.holder)}
                        >
                            <Controller
                                name="holder"
                                control={control}
                                render={({field}) => (
                                    <Input placeholder="e.g. Artur Asatryan" {...field} />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label={t('Bank Name')}
                            invalid={Boolean(errors.bank)}
                        >
                            <Controller
                                name="bank"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        instanceId="custom"
                                        options={banks}
                                        components={{
                                            Option: CustomSelectOption,
                                            Control: CustomControl,
                                        }}
                                        placeholder={t('Select Bank')}
                                    />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label={t('IBAN')}
                            invalid={Boolean(errors.iban)}
                        >
                            <Controller
                                name="iban"
                                control={control}
                                render={({field}) => (
                                    <Input placeholder="e.g. AM123456789012345678" {...field} />
                                )}
                            />
                        </FormItem>

                        <FormItem
                            label={t('SWIFT / BIC Code')}
                            invalid={Boolean(errors.swift)}
                        >
                            <Controller
                                name="swift"
                                control={control}
                                render={({field}) => (
                                    <Input placeholder={`${t('e.g.')} HSBKAM22`} {...field} />
                                )}
                            />
                        </FormItem>

                        <FormItem>
                            <Button block loading={isSubmitting} variant="solid" type="submit">
                                {t(isSubmitting ? 'Saving...' : 'Save Bank Info')}
                            </Button>
                        </FormItem>

                        {submitted && (
                            <div className="mt-4 text-green-600 font-medium">
                                ✅ {t('Your bank information has been saved successfully!')}
                            </div>
                        )}
                    </Form>
                </div>
            </Card>
        </div>
    )
}

export default SettingsBusiness
