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
                <p dangerouslySetInnerHTML={{ __html: t('lead_bot_description') }}></p>
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
