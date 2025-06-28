import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import useTranslation from "@/utils/hooks/useTranslation.js";

const RequestListSearch = (props) => {
    const { onInputChange, ref } = props
    const {t} = useTranslation()

    return (
        <DebouceInput
            ref={ref}
            placeholder={t('Quick search...')}
            suffix={<TbSearch className="text-lg" />}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default RequestListSearch
