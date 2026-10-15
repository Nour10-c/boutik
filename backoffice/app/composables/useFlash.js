export const useFlash = () => {
    const flash = useState('admin-flash', () => null)

    const setFlash = (variant, message) => {
        flash.value = { variant, message }
    }

    const consumeFlash = () => {
        const value = flash.value
        flash.value = null
        return value
    }

    return { setFlash, consumeFlash }
}