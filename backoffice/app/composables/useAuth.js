import { verifyToken } from '~/services/auth'

const SESSION_COOKIE = 'admin-token'
const SESSION_OPTIONS = { maxAge: 60 * 60, sameSite: 'strict' }

export const useAuth = () => {
    const token = useState('admin-token', () => null)
    const isAuthenticated = computed(() => token.value !== null)

    const login = async (value) => {
        await verifyToken(value)
        useCookie(SESSION_COOKIE, SESSION_OPTIONS).value = value
        token.value = value
    }

    const logout = () => {
        useCookie(SESSION_COOKIE, SESSION_OPTIONS).value = null
        token.value = null
    }

    return { token, isAuthenticated, login, logout }
}