import {useEffect} from 'react'
import {Form} from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import InfoSection from './InfoSection.jsx'
import ScheduleSection from './ScheduleSection.jsx'
import isEmpty from 'lodash/isEmpty'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

const promoCodeSchema = z.object({
    code: z.string().min(1, ''),
    discountType: z.enum(['percent', 'fixed'], {
        errorMap: () => ({ message: '' }),
    }),
    discountValue: z.string().min(1, ''),
    maxUsage: z.string().optional(),
})

const validationSchema = z.object({
    title: z.string().min(1, { message: '' }),
    start: z.date({
        required_error: '',
        invalid_type_error: "",
    }),
    end: z.date({
        required_error: '',
        invalid_type_error: "",
    }),
    price: z.string().min(1, { message: '' }),
    channel: z.number().min(1, { message: '' }),
    description: z.string().min(1, { message: '' }),
    promoCodes: z
        .array(promoCodeSchema)
        .refine(
            (promoCodes) => {
                const codes = promoCodes.map((p) => p.code?.trim().toLowerCase());
                return new Set(codes).size === codes.length;
            },
            {
                message: 'Promo code values must be unique',
                path: ['unique'],
            }
        ).optional(),
})

const EventForm = (props) => {
    const {
        onFormSubmit,
        channels,
        defaultValues = {},
        children,
        pageTitle = 'Create Event',
    } = props

    const {
        handleSubmit,
        reset,
        formState: {errors},
        control,
        register,
    } = useForm({
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <InfoSection register={register} control={control} errors={errors} channels={channels} pageTitle={pageTitle}/>
                    </div>
                    <div className="md:w-[370px] gap-4 flex flex-col">
                        <ScheduleSection control={control} errors={errors}/>
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default EventForm
