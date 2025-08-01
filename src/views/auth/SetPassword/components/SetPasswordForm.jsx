import {useState} from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import {Form, FormItem} from '@/components/ui/Form'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {apiSetPassword} from '@/services/AuthService'
import {useNavigate} from 'react-router'
import toast from "@/components/ui/toast/index.js";
import Notification from "@/components/ui/Notification/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";


const validationSchema = z.object({
    password: z.string().min(6, 'Գաղտնաբառը պետք է ունենա առնվազն 6 նիշ'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Գաղտնաբառերը չեն համընկնում',
    path: ['confirmPassword'],
})

const SetPasswordForm = ({token, setMessage}) => {
    const [isSubmitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values) => {
        setSubmitting(true)
        try {
            const res = await apiSetPassword({
                token,
                password: values.password,
                password_confirmation: values.confirmPassword,
            })

            toast.push(
                <Notification title={t('Your password has been set successfully!')} type="success" duration={4000}
                              width={500}>
                    {t('You can now log in to your account using your new password.')}
                </Notification>,
                {placement: 'top-center'},
            )

            navigate('/overview')
        } catch (err) {
            setMessage?.(
                err?.response?.data?.message || 'Սխալ տեղի ունեցավ։ Խնդրում ենք փորձել նորից։'
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem
                    label="Գաղտնաբառ"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({field}) => (
                            <Input
                                type="password"
                                placeholder="Նոր գաղտնաբառ"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Հաստատեք գաղտնաբառը"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({field}) => (
                            <Input
                                type="password"
                                placeholder="Կրկնեք գաղտնաբառը"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Ուղարկվում է...' : 'Սահմանել գաղտնաբառ'}
                </Button>
            </Form>
        </div>
    )
}

export default SetPasswordForm
