import {useEffect, useState} from 'react'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import SetPasswordForm from './components/SetPasswordForm.jsx'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import {useNavigate} from 'react-router'
import {apiCheckToken} from "@/services/AuthService.js";
import { AiOutlineClockCircle } from 'react-icons/ai'


export const SetPasswordBase = ({signInUrl = '/sign-in'}) => {
    const [message, setMessage] = useTimeOutMessage()
    const [token, setToken] = useState(null)
    const [expert, setExpert] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tokenValidUntil, setTokenValidUntil] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const tokenFromUrl = query.get('token')
        setToken(tokenFromUrl)

        if (!tokenFromUrl) {
            setError('Տոկենը բացակայում է։')
            setLoading(false)
            return
        }

        const verifyToken = async () => {
            try {
                const res = await apiCheckToken({token: tokenFromUrl})

                const {request, token_valid_until} = res.data

                if (token_valid_until) {
                    setExpert(request)
                    setTokenValidUntil(token_valid_until)
                } else {
                    setError(res.data.message || 'Տոկենն անվավեր է կամ ժամկետն անցել է։')
                }
            } catch (err) {
                setError('Սխալ տեղի ունեցավ։ Խնդրում ենք փորձել ավելի ուշ։')
            } finally {
                setLoading(false)
            }
        }

        verifyToken()
    }, [])

    const handleContinue = () => {
        navigate(signInUrl)
    }

    return (
        <div>
            <div className="mb-6">
                <h3 className="mb-2">Ստեղծել գաղտնաբառ</h3>
                <p className="mb-4">
                    Բարև <strong>{expert?.first_name || 'փորձագետ'}</strong>, խնդրում ենք սահմանել գաղտնաբառ Ձեր հաշվի համար: <br/>
                    <strong>Մուտք գործելիս օգտագործեք հետևյալ էլ. փոստի հասցեն՝ {expert?.email}</strong>
                </p>
            </div>

            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}

            {loading ? (
                <p>Բեռնվում է...</p>
            ) : error ? (
                <Alert type="danger" showIcon>{error}</Alert>
            ) : (
                <SetPasswordForm
                    token={token}
                    setMessage={setMessage}
                />
            )}

            {tokenValidUntil && (
                <div className="mb-4 p-3 text-yellow-700 flex">
                    <AiOutlineClockCircle size={20}/> <strong className={`mx-2`}> Հղումը վավեր է մինչև՝ </strong> {tokenValidUntil}
                </div>
            )}
        </div>
    )
}

const SetPassword = () => {
    return <SetPasswordBase/>
}

export default SetPassword
