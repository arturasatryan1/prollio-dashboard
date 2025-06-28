import Card from '@/components/ui/Card'
import Switcher from '@/components/ui/Switcher'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import useTranslation from "@/utils/hooks/useTranslation.js";

const AccountSection = ({ control }) => {

    const {t} = useTranslation()

    return (
        <Card>
            <div className="mt-6">
                <FormItem>
                    <Controller
                        name="allowComment"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center justify-between gap-8">
                                <div>
                                    <h6>{t('Allow Comments')}</h6>
                                    <p>{t('Allow comments on the posts')}</p>
                                </div>
                                <Switcher
                                    checked={field.value}
                                    onChange={(checked) => {
                                        field.onChange(checked)
                                    }}
                                />
                            </div>
                        )}
                    />
                </FormItem>
                <FormItem className="mb-0">
                    <Controller
                        name="allowReaction"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center justify-between gap-8">
                                <div>
                                    <h6>{t('Allow Reactions')}</h6>
                                    <p>{t('Allow reactions on the posts')}</p>
                                </div>
                                <Switcher
                                    checked={field.value}
                                    onChange={(checked) => {
                                        field.onChange(checked)
                                    }}
                                />
                            </div>
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default AccountSection
