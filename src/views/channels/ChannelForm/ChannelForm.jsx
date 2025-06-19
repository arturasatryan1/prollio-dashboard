import {useEffect} from 'react'
import {Form} from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import ProfileImageSection from './ProfileImageSection'
import AccountSection from './AccountSection'
import isEmpty from 'lodash/isEmpty'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

const validationSchema = z.object({
    name: z.string().min(1, {message: ''}),
    description: z.string().min(1, {message: ''}),
    img: z.string().nullable(),
    allowComment: z.boolean(),
    allowReaction: z.boolean(),
})

const ChannelForm = (props) => {
    const {
        onFormSubmit,
        defaultValues = {},
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: {errors},
        control,
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
                        <OverviewSection control={control} errors={errors}/>
                    </div>
                    <div className="md:w-[370px] gap-4 flex flex-col">
                        <ProfileImageSection
                            control={control}
                            errors={errors}
                        />
                        <AccountSection control={control} errors={errors}/>
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ChannelForm
