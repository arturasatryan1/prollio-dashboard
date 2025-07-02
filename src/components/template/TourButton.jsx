import withHeaderItem from '@/utils/hoc/withHeaderItem'
import {AiOutlineQuestionCircle} from "react-icons/ai";
import Button from "@/components/ui/Button/index.jsx";
import { usePageTour } from '@/utils/hooks/useTour'

const _TourButton = () => {
    const { restartTour } = usePageTour()

    return (
        <Button
            onClick={restartTour}
            variant="plain"
            shape="circle"
            size="sm"
            icon={<AiOutlineQuestionCircle className="text-2xl"/>}
        />
    )
}

const TourButton = withHeaderItem(_TourButton)

export default TourButton
