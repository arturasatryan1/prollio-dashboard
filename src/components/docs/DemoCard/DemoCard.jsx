import { useEffect, useRef } from 'react'
import Card from '@/components/ui/Card'
import CardFooter from './CardFooter'
import ReactHtmlParser from 'html-react-parser'
import { useLocation } from 'react-router'

const DemoCard = (props) => {
    const { demoComponent, id, title, desc = '', hideFooter, ...rest } = props

    const location = useLocation()
    const lastHash = useRef('')

    useEffect(() => {
        if (location.hash) {
            lastHash.current = location.hash.slice(1)
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document
                    .getElementById(lastHash.current)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                lastHash.current = ''
            }, 100)
        }
    }, [location])

    return (
        <div className="demo-card py-5" id={id}>
            <div className="mb-6">
                <h3>{title}</h3>
                {desc && (
                    <div className="mt-1 demo-card-description">
                        {ReactHtmlParser(desc)}
                    </div>
                )}
            </div>
            {demoComponent}
        </div>
    )
}

export default DemoCard
