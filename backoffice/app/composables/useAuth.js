import { verifyToken } from '~/services/auth'

export const useAuth = () => {
    const token = useState('admin-token', () => null)
    const isAuthenticated = computed(() => token.value !== null)

    const login = async (value) => {
        await verifyToken(value)
        token.value = value
    }

    const logout = () => {
        token.value = null
    }

    return { token, isAuthenticated, login, logout }
}