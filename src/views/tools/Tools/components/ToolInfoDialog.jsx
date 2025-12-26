import React from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import sleep from '@/utils/sleep'
import useTranslation from "@/utils/hooks/useTranslation.js";
import {useToolStore} from "@/views/tools/Tools/store/toolStore.js";

const ToolPaymentDialog = () => {
    const {t} = useTranslation(false)

    const handleDialogClose = async () => {
        setToolInfoDialog(false)
        await sleep(200)
        setSelectedTool({})
    }

    const {toolInfoDialog, setToolInfoDialog, setToolPaymentDialog, selectedTool, setSelectedTool} = useToolStore()

    return (
        <Dialog
            isOpen={toolInfoDialog}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            <h4 className={'mb-3'}>{t(selectedTool.name)}</h4>

            <div class="space-y-4 text-sm text-gray-700">
                <p>
                    🤖 <strong>Lead Bot</strong> is your personal assistant designed to help you grow your
                    audience and increase conversions. It collects leads, tracks who visited your events, and lets you
                    follow up — even if they didn’t buy.
                </p>

                <p>
                    You can either <strong>connect your existing bot</strong> or request Prollio to create a
                    new one for you.
                    If you already have a bot
                    {/*<a href="https://t.me/BotFather" target="_blank" className="text-blue-600 underline">BotFather</a>,*/}
                    you can activate it instantly by providing your bot token.
                </p>

                <p>
                    If you don’t have a bot yet, we’ll create and personalize one for you — with your name, profile
                    photo, and welcome message.
                </p>

                <ul class="list-disc pl-5 space-y-1">
                    <li>Send messages to all leads — buyers and non-buyers</li>
                    <li>Segment and manage contacts easily</li>
                    <li>Track performance across different campaigns</li>
                </ul>

                <p>
                    🕓 <strong>Note:</strong> If you request a new bot, setup may take up to <strong>24
                    hours</strong> after payment.
                </p>

            </div>
            <div className="mt-6">
                <Button
                    block
                    variant="solid"
                    onClick={() => {
                        setToolInfoDialog(false)
                    }}
                >
                    {t('Close')}
                </Button>
            </div>
        </Dialog>
    )
}

export default ToolPaymentDialog
