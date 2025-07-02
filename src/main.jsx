import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {TourProvider} from '@reactour/tour';
const radius = 10

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TourProvider
            steps={[]}
            disableInteraction={true}
            styles={{
                popover: (base) => ({
                    ...base,
                    '--reactour-accent': '#000',
                    borderRadius: radius,
                }),
                maskArea: (base) => ({ ...base, rx: radius }),
                maskWrapper: (base) => ({ ...base, color: '#000' }),
                badge: (base) => ({ ...base, display: 'none' }), // optional: CSS backup

                // badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
                controls: (base) => ({ ...base, marginTop: 20 }),
                close: (base) => ({ ...base, right: 'auto', left: 12, top: 12 }),
                // button: (base) => ({
                //     ...base,
                //     fontSize: '1rem',
                //     borderRadius: '8px',
                // }),
            }}
        >
            <App/>
        </TourProvider>
    </React.StrictMode>,
)
