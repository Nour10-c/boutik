export default defineNuxtPlugin(() => {
    const token = useState('admin-token', () => null)
    token.value = useCookie('admin-token').value ?? null
})