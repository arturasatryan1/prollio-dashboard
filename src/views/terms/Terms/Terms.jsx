import DemoLayout from '@/components/docs/DemoLayout'
import LanguageSelector from "@/components/template/LanguageSelector.jsx";
import Header from "@/components/template/Header.jsx";
import classNames from "@/utils/classNames.js";
import Logo from "@/components/template/Logo.jsx";
import TermOfUse from "@/views/terms/Terms/TermOfUse.jsx";
import Privacy from "@/views/terms/Terms/Privacy.jsx";
import Refund from "@/views/terms/Terms/Refund.jsx";
import {APP_NAME} from "@/constants/app.constant.js";
import {Container} from "@/components/shared/index.jsx";
import useTranslation from "@/utils/hooks/useTranslation.js";

const demos = [
    {
        mdName: 'tm1',
        title: 'ՀԻՄՆԱԿԱՆ ՀԱՍԿԱՑՈՒԹՅՈՒՆՆԵՐ',
        component: <TermOfUse/>,
    },
    {
        mdName: 'tm2',
        title: 'ՕԳՏԱԳՈՐԾՄԱՆ ՊԱՅՄԱՆՆԵՐԸ, ՄԻԱՑՄԱՆ ԿԱՐԳԸ',
        component: <Privacy/>,
    },
    {
        mdName: 'tm3',
        title: 'ՓՈՂԵՐԻ ԼՎԱՑՄԱՆ ԵՎ ԱՀԱԲԵԿՉՈՒԹՅԱՆ ՖԻՆԱՆԱՍԱՎՈՐՄԱՆ ԴԵՄ ՊԱՅՔԱՐԻ ՎԵՐԱԲԵՐՅԱԼ ԴՐՈՒՅԹՆԵՐ',
        component: <Refund/>,
    },
    {
        mdName: 'tm4',
        title: 'ՊԱՅՄԱՆԱԳԻՐ ԿՆՔԵԼՈՒ ԳՈՐԾՈՒՆԱԿՈՒԹՅՈՒՆ',
        component: <Refund/>,
    },
    {
        mdName: 'tm5',
        title: 'ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ՎՃԱՐԸ ԵՎ ՎՃԱՐՄԱՆ ԿԱՐԳԸ',
        component: <Refund/>,
    },
    {
        mdName: 'tm6',
        title: 'ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ՎՃԱՐԸ ԵՎ ՎՃԱՐՄԱՆ ԿԱՐԳԸ',
        component: <Refund/>,
    }, {
        mdName: 'tm7',
        title: 'ՊԱՏԱՍԽԱՆԱՏՎՈՒԹՅՈՒՆԸ',
        component: <Refund/>,
    },
];

const demoHeader = {
    title: 'ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ՊԱՅՄԱՆՆԵՐ',
    desc: "Վերջին անգամ թարմացվել է 23.05.2025թ.\n" +
        "\n" +
        "Սույն կանոնները հանդիսանում են «ՊՐՈԼԼԻՈ» ՍՊԸ-ի կողմից Ալիքի (chanel) ստեղծման և օգտագործման վերաբերյալ բաժանորդագրության պայմաններ (այսուհետ նաև` Պայմաններ):\n" +
        "\n" +
        "ԽՆԴՐՈՒՄ ԵՆՔ ՈՒՇԱԴԻՐ ԿԱՐԴԱԼ ԲԱԺԱՆՈՐԴԱԳՐՈՒԹՅԱՆ ՊԱՅՄԱՆՆԵՐԸ, ՔԱՆԻ ՈՐ ԴՐԱՆՔ ԿԱՐԳԱՎՈՐՈՒՄ ԵՆ ՁԵՐ ԵՎ ԻՐԱՎԱՏԻՐՈՋ, ԻՆՉՊԵՍ ՆԱԵՎ ՁԵՐ ԵՎ ՁԵՐ ԱԼԻՔԻՑ ՕԳՏՎՈՂՆԵՐԻ (ՕԳՏԱԳՈՐԾՈՂՆԵՐԻ) ՄԻՋԵՎ ԾԱԳԱԾ ՀԱՐԱԲԵՐՈՒԹՅՈՒՆՆԵՐԸ:\n" +
        "\n" +
        "ՊԱՅՄԱՆՆԵՐՈՒՄ ԺԱՄԱՆԱԿ ԱՌ ԺԱՄԱՆԱԿ ՏԵՂԻ ԵՆ ՈՒՆԵՆՈՒՄ ՓՈՓՈԽՈՒԹՅՈՒՆՆԵՐ, ՈՐՈՆՑ ԵՎՍ ԿԱՐՈՂ ԵՔ ԾԱՆՈԹԱՆԱԼ ՀԱՐԹԱԿԻ ՄԻՋՈՑՈՎ։\n" +
        "\n" +
        "Ներկայացված պայմանները Ձեր կողմից համարվում են լրիվ և անվերապահ ընդունված, եթե Հարթակի միջոցով Ձեր կողմից կատարվել է ցանկացած այնպիսի գործողություն, որը միտված է Հարթակի ծառայություններից օգտվելուն (ներառյալ, բայց չսահմանափակվելով՝ տվյալների լրացում կամ Պայմաններին համաձայնություն):"
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
