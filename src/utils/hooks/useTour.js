import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useTour } from '@reactour/tour'
import { getOverviewSteps,  getChannelsSteps } from '@/tourSteps'
import useTranslation from "@/utils/hooks/useTranslation.js";

export const usePageTour = () => {
    const { pathname } = useLocation()
    const { setSteps, setIsOpen, setCurrentStep } = useTour()

    const pageKey = pathname.split('/')[1] || 'overview'
    const { t } = useTranslation()

    const stepsMap = {
        overview: getOverviewSteps(t),
        channels: getChannelsSteps(t),
    }

    const steps = stepsMap[pageKey] || []

    useEffect(() => {
        setSteps(steps)

        const seenKey = `tour_seen_${pageKey}`
        if (!localStorage.getItem(seenKey)) {
            setCurrentStep(0)
            setIsOpen(true)
            localStorage.setItem(seenKey, '1')
        }
    }, [pathname])

    const restartTour = () => {
        setSteps(steps)
        setCurrentStep(0)
        setIsOpen(true)
    }

    return { restartTour }
}
