import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/index";
import {Button} from "@/components/ui/index";
import classNames from '@/utils/classNames'
import Segment from "../../../../components/ui/Segment/index.jsx";
import {TbCheck, TbTrash} from "react-icons/tb";
import {Form, FormItem} from "@/components/ui/Form/index.jsx";
import Container from "../../../../components/shared/Container.jsx";
import Upload from "@/components/ui/Upload/index.jsx";
import {Controller, useForm} from "react-hook-form";
import Avatar from "../../../../components/ui/Avatar/index.jsx";
import {HiOutlineUser} from "react-icons/hi";
import DoubleSidedImage from "../../../../components/shared/DoubleSidedImage.jsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import useTranslation from "@/utils/hooks/useTranslation.js";
import {Card, Tooltip} from "@/components/ui/index.js";
import {FaInfoCircle} from "react-icons/fa";
import BottomStickyBar from "@/components/template/BottomStickyBar.jsx";
import {useNavigate} from "react-router";
import {apiSubmitToolSetup} from "@/services/ToolService.js";
import {apiGetSettingsProfile} from "@/services/AccontsService.js";
import {useSessionUser} from "@/store/authStore.js";

const validateImageUrlSize = (url, type = 'avatar') => {
    return new Promise((resolve, reject) => {
        if (!url) return resolve(true)

        const img = new Image()
        img.src = url

        img.onload = () => {
            const {width, height} = img

            if (type === 'avatar') {
                if (width !== height || width !== 512) {
                    return reject('Avatar must be exactly 512×512 and square.')
                }
            } else if (type === 'description') {
                const allowedSizes = [
                    [320, 180],
                    [640, 360],
                    [960, 540],
                ]
                const valid = allowedSizes.some(([w, h]) => w === width && h === height)
                if (!valid) {
                    return reject('Description image must be 320×180, 640×360, or 960×540.')
                }
            }

            resolve(true)
        }

        img.onerror = () => reject('Invalid or corrupted image.')
    })
}

const getBotValidationSchema = (mode) => {
    return z.object({
        token: mode === 'connect'
            ? z.string()
                .min(1, {message: 'Bot token is required'})
            // .regex(/^\d{9,10}:[A-Za-z0-9_-]{35}$/, {
            //     message: 'Invalid bot token format',
            // })
            // .refine(async (token) => {
            //     try {
            //         const res = await fetch(`https://api.telegram.org/bot${token}/getMe`)
            //         const data = await res.json()
            //         return data.ok
            //     } catch {
            //         return false
            //     }
            // }, {
            //     message: 'Token is not valid or bot is unreachable',
            // })
            : z.string().optional(),

        name: mode === 'new'
            ? z.string()
                .min(1, {message: 'Name is required'})
                .max(64, {message: 'Name must be at most 64 characters'})
            : z.string().optional(),

        description: z.string()
            .max(512, {message: 'Description must be at most 512 characters'})
            .optional(),

        img: z.string().optional(),

        descriptionImg: z.string().optional()
            .refine(async (url) => {
                if (!url) return true
                try {
                    await validateImageUrlSize(url, 'description')
                    return true
                } catch {
                    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
                    return false
                }
            }, 'Image must be 320×180, 640×360, or 960×540'),
    })
}

export default function LeadBotSetup() {
    const [mode, setMode] = useState("new");
    const [validationSchema, setValidationSchema] = useState(getBotValidationSchema('new'))
    const [isSubmitting, setIsSubmitting] = useState(false)

    const setUser = useSessionUser((state) => state.setUser)

    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        handleSubmit,
        reset,
        formState: {errors},
        control
    } = useForm({
        defaultValues: {},
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        setValidationSchema(getBotValidationSchema(mode))
    }, [mode])

    const onSubmit = async (values) => {
        try {
            setIsSubmitting(true)

            await apiSubmitToolSetup({
                mode: mode,
                ...values
            })

            const res = await apiGetSettingsProfile()
            if (res) {
                setUser(res)
            }

            navigate('/tools')
        } catch (err) {
            alert(err)
        } finally {
            setIsSubmitting(false)
        }
    };

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

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container className={'h-full px-4 sm:px-6 lg:px-8'}>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 h-full">
                    <div className={"col-span-1 lg:col-span-4 h-full"}>
                        <Card className={'h-full flex flex-col justify-between'}>
                            <div className="gap-4 flex flex-col flex-auto">
                                <h1 className="text-2xl font-bold">{t('Activate Your Lead Bot')}</h1>
                                <p>{t('Choose how you want to activate your Telegram Lead Bot.')}</p>

                                <Segment
                                    defaultValue={'new'}
                                    className="gap-4 flex bg-transparent"
                                    onChange={(val) => setMode(val)}
                                >
                                    <Segment.Item value="new">
                                        {({active, onSegmentItemClick}) => (
                                            <div
                                                className={classNames(
                                                    'flex items-center relative border rounded-xl border-gray-300 dark:border-gray-600 py-5 px-4 select-none cursor-pointer',
                                                    active
                                                        ? 'ring-primary border-primary bg-white dark:bg-gray-700'
                                                        : 'ring-transparent bg-gray-100 dark:bg-gray-600'
                                                )}
                                                onClick={onSegmentItemClick}
                                            >
                                                {t('Create a new bot')}

                                                {active && (
                                                    <TbCheck size={25} className="text-primary absolute right-1 top-0"/>
                                                )}
                                            </div>
                                        )}
                                    </Segment.Item>
                                    <Segment.Item value="connect">
                                        {({active, onSegmentItemClick}) => (
                                            <div
                                                className={classNames(
                                                    'flex items-center relative border rounded-xl border-gray-300 dark:border-gray-600 py-5 px-4 select-none cursor-pointer',
                                                    active
                                                        ? 'ring-primary border-primary bg-white dark:bg-gray-700'
                                                        : 'ring-transparent bg-gray-100 dark:bg-gray-600'
                                                )}
                                                onClick={onSegmentItemClick}
                                            >
                                                {t('Connect existing bot')}

                                                {active && (
                                                    <TbCheck size={25} className="text-primary absolute right-1 top-0"/>
                                                )}
                                            </div>
                                        )}

                                    </Segment.Item>
                                </Segment>

                                {mode === "new" && (
                                    <div className="space-y-4">
                                        <p>
                                            🕓 {t('Requesting a new bot may take up to 24 hours, as we create and personalize it for you.')}
                                        </p>
                                        <div>
                                            <FormItem
                                                label={(
                                                    <div className={"flex items-center"}>
                                                        <div className={"mr-2"}>{t('Bot Name')}</div>
                                                        <Tooltip
                                                            title={
                                                                <div className={'w-[350px]'}>
                                                                    <img
                                                                        className={'w-[350px]'}
                                                                        src="/img/others/lead.jpeg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            }
                                                            placement="left"
                                                        >
                                                            <FaInfoCircle size={18}/>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                                invalid={Boolean(errors.name)}
                                            >
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    render={({field}) => (
                                                        <Input
                                                            type="text"
                                                            autoComplete="off"
                                                            placeholder={t('e.g., Coach Anna Bot')}
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </FormItem>
                                        </div>
                                        <div>
                                            <FormItem
                                                label={
                                                    (
                                                        <div className={"flex items-center"}>
                                                            <div className={"mr-2"}>{t('Welcome Message')}</div>
                                                            <Tooltip
                                                                title={
                                                                    <div className={'w-[350px]'}>
                                                                        <img
                                                                            className={'w-[350px]'}
                                                                            src="/img/others/lead.jpeg"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                }
                                                                placement="left"
                                                            >
                                                                <FaInfoCircle size={18}/>
                                                            </Tooltip>
                                                        </div>
                                                    )
                                                }
                                                invalid={Boolean(errors.description)}
                                                errorMessage={errors.description?.message}
                                            >
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    render={({field}) => (
                                                        <Input
                                                            textArea
                                                            autoComplete="off"
                                                            placeholder={t("Hello! I'm here to help you get started...")}
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                )}
                                {mode === "connect" && (
                                    <div className="space-y-4">
                                        <p>
                                            Already have a Telegram bot created via @BotFather?
                                            Connect it to Prollio by entering your bot token. Once connected, you’ll be
                                            able to use it as a Lead Bot — with full access to lead tracking, messaging,
                                            and automation tools.
                                        </p>
                                        <p>
                                            🔗 {t('Connecting an existing bot is fast — activation happens immediately after submitting your bot token.')}
                                        </p>

                                        <FormItem
                                            label={t('Bot Token')}
                                            invalid={Boolean(errors.token)}
                                            errorMessage={errors.token?.message}
                                        >
                                            <Controller
                                                name="token"
                                                control={control}
                                                render={({field}) => (
                                                    <Input
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder={t('Enter your Telegram Bot Token')}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </FormItem>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {mode === "new" && (
                        <div className="col-span-1 lg:col-span-2 gap-4 flex flex-col h-full">
                            <Card className={''}>
                                <h4 className="mb-3 flex justify-between">
                                    {t('Bot Avatar (Profile Photo)')}
                                    <Tooltip
                                        title={
                                            <div className={'w-[350px]'}>
                                                <img
                                                    className={'w-[350px]'}
                                                    src="/img/others/lead.jpeg"
                                                    alt=""
                                                />
                                            </div>
                                        }
                                        placement="top-start"
                                    >
                                        <FaInfoCircle/>
                                    </Tooltip>
                                </h4>
                                <p className={'mb-3'}>Upload a square image (JPG or PNG, 512×512 px
                                    recommended).</p>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg text-center p-4">
                                    <div className="text-center">
                                        <FormItem
                                            invalid={Boolean(errors.img)}
                                            errorMessage={errors.img?.message}
                                        >
                                            <Controller
                                                name="img"
                                                control={control}
                                                render={({field}) => (
                                                    <>
                                                        <div className="flex items-center justify-center">
                                                            {field.value ? (
                                                                <Avatar
                                                                    size={100}
                                                                    className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                                                    icon={<HiOutlineUser/>}
                                                                    src={field.value}
                                                                />
                                                            ) : (
                                                                <DoubleSidedImage
                                                                    src="/img/others/upload.png"
                                                                    darkModeSrc="/img/others/upload-dark.png"
                                                                    alt="Upload image"
                                                                />
                                                            )}
                                                        </div>
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
                                                                className="my-2"
                                                                type="button"
                                                            >
                                                                {t(field.value ? 'Change Image' : 'Upload Image')}

                                                            </Button>
                                                        </Upload>
                                                    </>
                                                )}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                            </Card>
                            <Card className={''}>
                                <h4 className="mb-3 flex justify-between">
                                    {t('Description Image')}
                                    <Tooltip
                                        title={
                                            <div className={'w-[350px]'}>
                                                <img
                                                    className={'w-[350px]'}
                                                    src="/img/others/lead.jpeg"
                                                    alt=""
                                                />
                                            </div>
                                        }
                                        placement="left"
                                    >
                                        <FaInfoCircle/>
                                    </Tooltip>
                                </h4>
                                <p className={'mb-3'}>Upload a description image for the bot — 640×360 px.
                                    GIFs are also allowed: 320×180, 640×360, or 960×540.
                                    This will appear in the "What can this bot do?" section. </p>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg text-center p-4">
                                    <div className="text-center">
                                        <FormItem
                                            invalid={Boolean(errors.descriptionImg)}
                                            errorMessage={errors.descriptionImg?.message}
                                        >
                                            <Controller
                                                name="descriptionImg"
                                                control={control}
                                                render={({field}) => (
                                                    <>
                                                        <div className="flex items-center justify-center">
                                                            {field.value ? (
                                                                <img
                                                                    className="w-full h-auto max-h-[300px] object-contain"
                                                                    src={field.value}
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <DoubleSidedImage
                                                                    src="/img/others/upload.png"
                                                                    darkModeSrc="/img/others/upload-dark.png"
                                                                    alt="Upload image"
                                                                />
                                                            )}
                                                        </div>
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
                                                                className="my-2"
                                                                type="button"
                                                            >
                                                                {t(field.value ? 'Change Image' : 'Upload Image')}

                                                            </Button>
                                                        </Upload>
                                                    </>
                                                )}
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </Container>

            <BottomStickyBar>
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                onClick={() => navigate('/tools')}
                                icon={<TbTrash/>}
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmitting}
                            >
                                {t(isSubmitting ? 'Submitting...' : 'Submit')}
                            </Button>
                        </div>
                    </div>
                </Container>
            </BottomStickyBar>
        </Form>
    );
}
