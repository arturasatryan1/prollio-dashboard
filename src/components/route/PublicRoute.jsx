import { Navigate, Outlet } from 'react-router'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated } = useAuth()

    const pathName = location.pathname

    const allowedPaths = ['/terms', '/checkout']

    if (authenticated && !allowedPaths.includes(pathName)) {
        return <Navigate to={authenticatedEntryPath} />
    }

    return <Outlet />
}

export default PublicRoute
