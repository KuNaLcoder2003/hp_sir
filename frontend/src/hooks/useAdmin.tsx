import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
    }, [])

    const onAdminLogin = (token: string) => {
        navigate('/admin')
        localStorage.setItem('token', token)
        setIsAdmin(true)
    }
    const onAdminLogout = () => {
        localStorage.clear()
        setIsAdmin(false)
        navigate('/admin/signin')
    }
    return { isAdmin, onAdminLogin, onAdminLogout }
}
export default useAdmin;