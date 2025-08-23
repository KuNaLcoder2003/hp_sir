import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
    children: ReactNode,
    logInUrl: string,
}

interface UserCred {
    email: string,
    password: string
}

interface AuthContextType {
    user: string,
    loggedIn: boolean,
    loading: boolean,
    login: (cred: UserCred) => Promise<void>,
    logout: () => void,
    isAdmin: boolean,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "token";
const ROLE_KEY = "role";

export const AuthProvider = ({ children, logInUrl }: Props) => {
    const [user, setUser] = useState<string>("")
    const [loggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        const role = localStorage.getItem(ROLE_KEY);
        try {
            if (token) {
                setIsLoggedIn(true)
                setIsAdmin(role === "admin")
            } else {
                setIsAdmin(false)
                setIsLoggedIn(false)
            }
        } catch {
            toast.error("Unauthorized")
        }
    }, [])

    const login = async (userCred: UserCred) => {
        setLoading(true)
        try {
            const response = await fetch(logInUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cred: {
                        email: userCred.email,
                        password: userCred.password
                    }
                }),
            })
            const data = await response.json()

            if (data.token) {
                localStorage.setItem(TOKEN_KEY, `Bearer ${data.token}`)
                localStorage.setItem(ROLE_KEY, data.role)
                setUser(data.user) // fallback to email
                setIsLoggedIn(true)
                setIsAdmin(data.role === "admin")
                navigate("/dashboard")
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setIsAdmin(false)
        setIsLoggedIn(false)
        setUser("")
        localStorage.clear()
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ user, loggedIn, loading, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
