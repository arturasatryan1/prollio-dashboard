import {useState} from 'react'
import Card from '@/components/ui/Card'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {Button} from "@/components/ui/index.js";
import {FiCpu, FiMessageCircle} from "react-icons/fi";
import {NumericFormat} from "react-number-format";
import {useToolStore} from "@/views/tools/Tools/store/toolStore.js";
import ToolPaymentDialog from "@/views/tools/Tools/components/ToolPaymentDialog.jsx";
import ToolInfoDialog from "@/views/tools/Tools/components/ToolInfoDialog.jsx";
import {useSessionUser} from "@/store/authStore.js";
import {Link, useNavigate} from "react-router";
import Tag from "@/components/ui/Tag/index.jsx";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {CiClock1, CiClock2, CiWarning} from "react-icons/ci";
import {FaClock} from "react-icons/fa";

const toolStatusColor = {
    pending: 'bg-amber-400 text-white',
    paid: 'bg-blue-200 dark:bg-blue-300 text-gray-900',
    active: 'bg-emerald-500 text-white',
    expired: 'bg-gray-300 dark:bg-gray-400 text-gray-900',
};

const Tools = () => {
    const {setToolPaymentDialog, setToolInfoDialog, setSelectedTool} = useToolStore()
    const user = useSessionUser((state) => state.user)
    const navigate = useNavigate()
    const {t} = useTranslation()

    const expertTools = user?.expert?.tools

    const tools = [
        {
            name: "Lead Bot",
            slug: "lead-bot",
            icon: <FiMessageCircle className="text-primary"/>,
            description: "Convert users into paying clients with your personalized bot.",
            note: 'After completing your payment, you can either connect your existing bot for immediate activation, or request a new bot, which will be personalized and activated within 24 hours.',
            price: 39500,
            button_text: 'Activate Lead Bot',
            coming: false,
            list_items: [
                'Fully personalized bot',
                'Track users who clicked but did not buy',
                'Send messages to all leads — even non-buyers',
            ]
        },
        {
            name: "AI Assistant (Coming Soon)",
            slug: "ai-assistant",
            icon: <FiCpu className="text-primary"/>,
            description: "Generate content, analyze event data, and get smart suggestions to grow your audience.",
            price: null,
            button_text: null,
            coming: true,
            list_items: [
                'Generate post/event ideas',
                'Analyze engagement & suggest improvements',
                'Save time with AI-generated content',
            ]
        }
    ]

    const expertToolMap = new Map(
        expertTools.map(toolAccess => [toolAccess.tool?.slug, toolAccess.status])
    );

    return (
        <div>
            <div className="mb-8">
                <h3 className={`mb-2`}>{t('Boost your growth with powerful tools.')}</h3>
                <p>{t('Prollio Growth Tools are designed to help you attract more members, increase sales, and save time — all from your expert dashboard.')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tools.map((tool, idx) => {
                    const hasTool = expertToolMap.has(tool.slug);
                    const toolStatus = expertToolMap.get(tool.slug);

                    return (
                        <Card
                            key={idx}
                            className={`rounded-2xl relative shadow-md p-2 flex flex-col justify-between ${tool.coming && 'opacity-60'}`}
                        >
                            {toolStatus && (
                                <Tag className={`rounded-full bg-green-200 font-bold absolute right-2 top-2 ${toolStatusColor[toolStatus]}`}>
                                    {t(toolStatus)}
                                </Tag>
                            )}

                            <div>
                                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                    {tool.icon}
                                    {t(tool.name)}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {t(tool.description)}
                                </p>
                                <ul className="text-sm text-gray-500 list-disc pl-4 mb-2 space-y-1">
                                    {tool.list_items.map((item, idx) => (
                                        <li key={idx}>{t(item)}</li>
                                    ))}
                                </ul>

                                {toolStatus ? (
                                    <div className={'mt-5 mb-7'}>
                                        {
                                            toolStatus === 'paid' && (
                                                <div className={'bg-amber-200 p-3 rounded'}>
                                                    <h6 className={'flex items-center'}><CiWarning size={18} className={'mr-1'}/> {t('Waiting for Bot Setup')}</h6>
                                                    <p className={''}>{t('You’ve successfully paid for the Lead Bot. To proceed, please complete the setup form.')}</p>
                                                </div>
                                            )
                                        }
                                        {
                                            toolStatus === 'setup' && (
                                                <div className={'bg-amber-200 p-3 rounded'}>
                                                    <h6 className={'flex items-center'}><CiClock1 size={18} className={'mr-1'}/> {t('Setting Up Your Lead Bot')}</h6>
                                                    <p className={''}>{t('Your Lead Bot setup request has been received. It’s being personalized and will be ready within 24 hours. You’ll be notified once it’s live.')}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    tool.price && (
                                        <div className="mt-6">
                                            <NumericFormat
                                                className="h4"
                                                displayType="text"
                                                value={tool.price}
                                                suffix={'֏'}
                                                thousandSeparator={true}
                                            />
                                            <span className="text-lg font-bold">{' '}/{' '}{t('year')}</span>
                                        </div>
                                    )
                                )}
                            </div>
                            {tool.button_text && (
                                <div className="flex gap-2 mt-4">
                                    {hasTool ? (
                                        toolStatus === 'paid' && (
                                            <Button
                                                variant="solid"
                                                onClick={() => {
                                                    navigate(`/tools/${tool.slug}/setup`)
                                                }}
                                            >
                                                {t('Continue Setup')}
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            variant="solid"
                                            onClick={() => {
                                                setSelectedTool(tool);
                                                setToolPaymentDialog(true);
                                            }}
                                        >
                                            {t(tool.button_text)}
                                        </Button>
                                    )}
                                    {/*<Button*/}
                                    {/*    variant="solid"*/}
                                    {/*    onClick={() => {*/}
                                    {/*        setSelectedTool(tool)*/}
                                    {/*        setToolPaymentDialog(true)*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    {tool.button_text}*/}
                                    {/*</Button>*/}
                                    <Button
                                        onClick={() => {
                                            setSelectedTool(tool)
                                            setToolInfoDialog(true)
                                        }}
                                    >
                                        {t('More Info')}</Button>
                                </div>
                            )}

                        </Card>
                    )
                })}
            </div>
            <ToolPaymentDialog/>
            <ToolInfoDialog/>
        </div>
    )
}

export default Tools
