import Container from '@/components/shared/Container'
import classNames from '@/utils/classNames'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import useTranslation from "@/utils/hooks/useTranslation.js";

const FooterContent = () => {

    const {t} = useTranslation()

    return (
        <div className="flex items-center justify-between flex-auto w-full">
            <span>
                {t('Copyright')}{' '}
                 &copy;{`${new Date().getFullYear()}`}{' '}
                <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                {t('All rights reserved.')}
            </span>
            <div className="">
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    {t('Term & Conditions')}
                </a>
                <span className="mx-2 text-muted"> | </span>
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    {t('Privacy & Policy')}
                </a>
            </div>
        </div>
    )
}

export default function Footer({ pageContainerType = 'contained', className }) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`,
                className,
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}
