/* eslint-disable react-refresh/only-export-components */
import Select from '@/components/ui/Select'
import useTranslation from "@/utils/hooks/useTranslation.js";



const OverviewHeader = ({ selectedPeriod, handlePeriodChange }) => {
    const { t } = useTranslation()

    const options = [
        { value: 'monthly', label: t('Monthly') },
        { value: 'weekly', label: t('Weekly') },
        { value: 'annually', label: t('Annually') }
    ]

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
            <div>
                <h4 className="mb-1">{t('Overview')}</h4>
                <p>{t('Track your revenue, events, and subscribers')}</p>
            </div>
            <div className="flex items-center gap-2 overview-period-selector">
                <span>{t('Show by:')}</span>
                <Select
                    className="w-[150px]"
                    size="sm"
                    placeholder="Select period"
                    value={options.filter(
                        (option) => option.value === selectedPeriod,
                    )}
                    options={options}
                    isSearchable={false}
                    onChange={(option) => handlePeriodChange(option)}
                />

            </div>
        </div>
    )
}

export default OverviewHeader
