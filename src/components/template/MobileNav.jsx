import {lazy, Suspense, useState} from 'react'
import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import NavToggle from '@/components/shared/NavToggle'
import {DIR_RTL} from '@/constants/theme.constant'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import navigationConfig from '@/configs/navigation.config'
import appConfig from '@/configs/app.config'
import {useThemeStore} from '@/store/themeStore'
import {useRouteKeyStore} from '@/store/routeKeyStore'
import {useSessionUser} from '@/store/authStore'
import useTranslation from "@/utils/hooks/useTranslation.js";

const VerticalMenuContent = lazy(
    () => import('@/components/template/VerticalMenuContent'),
)

const MobileNavToggle = withHeaderItem(NavToggle)

const MobileNav = ({translationSetup = appConfig.activeNavTranslation}) => {
    const [isOpen, setIsOpen] = useState(false)

    const {t} = useTranslation()

    const handleOpenDrawer = () => {
        setIsOpen(true)
    }

    const handleDrawerClose = () => {
        setIsOpen(false)
    }

    const direction = useThemeStore((state) => state.direction)
    const currentRouteKey = useRouteKeyStore((state) => state.currentRouteKey)

    const userAuthority = useSessionUser((state) => state.user.authority)

    return (
        <>
            <div className="text-2xl" onClick={handleOpenDrawer}>
                <MobileNavToggle toggled={isOpen}/>
            </div>
            <Drawer
                title={t('Navigation')}
                isOpen={isOpen}
                bodyClass={classNames('p-0')}
                width={330}
                placement={direction === DIR_RTL ? 'right' : 'left'}
                onClose={handleDrawerClose}
                onRequestClose={handleDrawerClose}
            >
                <Suspense fallback={<></>}>
                    {isOpen && (
                        <VerticalMenuContent
                            collapsed={false}
                            navigationTree={navigationConfig}
                            routeKey={currentRouteKey}
                            userAuthority={userAuthority}
                            direction={direction}
                            translationSetup={translationSetup}
                            onMenuItemClick={handleDrawerClose}
                        />
                    )}
                </Suspense>
            </Drawer>
        </>
    )
}

export default MobileNav
