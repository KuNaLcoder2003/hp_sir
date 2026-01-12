// components/ProtectedAdminRoute.tsx
import type { JSX } from "react"
import { Navigate } from "react-router-dom"

const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/admin/signin" replace />
    }

    return children
}

export default ProtectedAdminRoute
