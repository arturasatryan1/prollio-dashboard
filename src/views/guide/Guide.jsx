import DemoLayout from '@/components/docs/DemoLayout'
import useTranslation from "@/utils/hooks/useTranslation.js";
import ChannelGuide from "@/views/guide/ChannelGuide.jsx";
import BotGuide from "@/views/guide/BotGuide.jsx";




const Guide = () => {

    const {t} = useTranslation()

    const demos = [
        {
            mdName: 'tm1',
            title: t('guide.connect_channel.title'),
            component: <ChannelGuide/>,
        },
        // {
        //     mdName: 'tm2',
        //     title: t('guide.create_bot.title'),
        //     component: <BotGuide/>,
        // },
    ];

    const demoHeader = {
        title: t('guide.title'),
        desc: t('guide.description')
    }

    return (
        <DemoLayout
            innerFrame={false}
            header={demoHeader}
            demos={demos}
            listTitle={t("Guide Menu")}
            // mdPrefixPath="shared"
        />
    )
}

export default Guide
