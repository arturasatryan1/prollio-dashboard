import DemoLayout from '@/components/docs/DemoLayout'
import LanguageSelector from "@/components/template/LanguageSelector.jsx";
import Header from "@/components/template/Header.jsx";
import classNames from "@/utils/classNames.js";
import Logo from "@/components/template/Logo.jsx";
import Concept from "@/views/terms/Terms/Concept.jsx";
import TermOfUse from "@/views/terms/Terms/TermOfUse.jsx";
import Privacy from "@/views/terms/Terms/Privacy.jsx";
import Payment from "@/views/terms/Terms/Payment.jsx";
import SubscriptionTermination from "@/views/terms/Terms/SubscriptionTermination.jsx";
import Other from "@/views/terms/Terms/Other.jsx";
import {APP_NAME} from "@/constants/app.constant.js";
import {Container} from "@/components/shared/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";

const demos = [
    {
        mdName: 'tm1',
        title: 'ՀԻՄՆԱԿԱՆ ՀԱՍԿԱՑՈՒԹՅՈՒՆՆԵՐ',
        component: <Concept/>,
    },
    {
        mdName: 'tm2',
        title: 'ՕԳՏԱԳՈՐԾՄԱՆ ԿԱՆՈՆՆԵՐ ԵՎ ՊԱՅՄԱՆՆԵՐ',
        component: <TermOfUse/>,
    },
    {
        mdName: 'tm3',
        title: 'ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ՎՃԱՐԸ ԵՎ ՎՃԱՐՄԱՆ ԿԱՐԳԸ',
        component: <Payment/>,
    },
    {
        mdName: 'tm4',
        title: 'ԳԱՂՏՆԻՈՒԹՅՈՒՆ',
        component: <Privacy/>,
    },
    {
        mdName: 'tm5',
        title: 'ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ԴԱԴԱՐԵՑՈՒՄ',
        component: <SubscriptionTermination/>,
    },
    {
        mdName: 'tm6',
        title: 'ԱՅԼ ԴՐՈՒՅԹՆԵՐ',
        component: <Other/>,
    }
];

const demoHeader = {
    title: 'ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ԵՎ ՕԳՏԱԳՈՐԾՄԱՆ ՊԱՅՄԱՆՆԵՐ',
    desc: "Վերջին անգամ թարմացվել է 15.10.2025 թվականին\n" +
        "\n" +
        "ՍՈՒՅՆ ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ՊԱՅՄԱՆՆԵՐԸ ԿԱՐԳԱՎՈՐՈՒՄ ԵՆ ԱԼԻՔԻ ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ԵՎ ՕԳՏԱԳՈՐԾՄԱՆ ՊԱՅՄԱՆՆԵՐԸ ՁԵՐ (ՕԳՏԱԳՈՐԾՈՂՆԵՐԻ) ԿՈՂՄԻՑ:\n" +
        "\n" +
        "ԱԼԻՔԻՆ ՄԻԱՆԱԼՈՒ ՆՊԱՏԱԿՈՎ ԿԱՏԱՐՎԱԾ ՑԱՆԿԱՑԱԾ ՈՒՂՂԱԿԻ ԿԱՄ ԱՆՈՒՂՂԱԿԻ ԳՈՐԾՈՂՈՒԹՅԱՆ ԴԵՊՔՈՒՄ ԴՈՒՔ ՀԱՍՏԱՏՈՒՄ ԵՔ, ՈՐ ԿԱՐԴԱՑԵԼ ԵՔ ՍՈՒՅՆ ՊԱՅՄԱՆՆԵՐԸ ԵՎ ՀԱՄԱՁԱՅՆ ԵՔ ԴՐԱՆՑ ՀԵՏ:\n" +
        "\n" +
        "ԵԹԵ ԴՈՒՔ ՀԱՄԱՁԱՅՆ ՉԵՔ ՊԱՅՄԱՆՆԵՐԻՆ, ԽՆԴՐՈՒՄ ԵՆՔ ԴԱԴԱՐԵՑՆԵԼ ԱԼԻՔԻ ՕԳՏԱԳՈՐԾՈՒՄԸ: ԱԼԻՔՈՒՄ ԳՏՆՎԵԼԸ, ՎՃԱՐՈՒՄ ԿԱՏԱՐԵԼԸ` ԱՆԿԱԽ ՁԵՐ ԿՈՂՄԻՑ ՀՐԱՊԱՐԱԿՈՒՄՆԵՐԻՆ ԾԱՆՈԹԱՆԱԼՈՒ, ԱԼԻՔԻՆ ՉՀԵՏԵՎԵԼՈՒ ՀԱՆԳԱՄԱՆՔԻՑ, ՓԱՍՏՈՒՄ ԵՆ ՁԵՐ ԿՈՂՄԻՑ ՊԱՅՄԱՆՆԵՐԻ ԱՆՎԵՐԱՊԱՀ ԸՆԴՈՒՆՈՒՄԸ (ՕՖԵՐՏԱՅԻ ԱԿՑԵՊՏԱՎՈՐՈՒՄԸ):\n"
}

const pageContainerDefaultClass =
    'page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 py-6 sm:py-8 md:px-8 container mx-auto'

const Terms = () => {

    const {t} = useTranslation()

    return (
        <div>
            <Header
                className="shadow-sm dark:shadow-2xl"
                headerStart={
                    <Logo
                        imgClass="max-h-8"
                        // className={}
                    />
                }
                headerEnd={<LanguageSelector/>}
            />
            <main className="h-full">
                <div
                    className={classNames(
                        pageContainerDefaultClass,
                        'container mx-auto',
                    )}
                >

                    <DemoLayout
                        innerFrame={false}
                        header={demoHeader}
                        demos={demos}
                        mdPrefixPath="shared"
                        listTitle={"ԲՈՎԱՆԴԱԿՈՒԹՅԱՆ ՑՈՒՑԱԿ"}
                    />
                </div>
            </main>
            <footer className={`footer flex flex-auto items-center h-16`}>
                <Container>
                    <div className="flex items-center justify-between flex-auto w-full">
                        <span>
                            {t('Copyright')} &copy; {`${new Date().getFullYear()}`}{' '}
                            <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                            {t('All rights reserved.')}
                        </span>
                    </div>
                </Container>
            </footer>
        </div>

    )
}

export default Terms
