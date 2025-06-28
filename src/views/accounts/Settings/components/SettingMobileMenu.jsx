import { useRef } from 'react'
import ToggleDrawer from '@/components/shared/ToggleDrawer'
import SettingsMenu from './SettingsMenu'
import useTranslation from "@/utils/hooks/useTranslation.js";

const SettingMobileMenu = () => {
    const drawerRef = useRef(null)
    const {t} = useTranslation()

    return (
        <>
            <div>
                <ToggleDrawer ref={drawerRef} title={t('Navigation')}>
                    <SettingsMenu
                        onChange={() => {
                            drawerRef.current?.handleCloseDrawer()
                        }}
                    />
                </ToggleDrawer>
            </div>
        </>
    )
}

export default SettingMobileMenu
