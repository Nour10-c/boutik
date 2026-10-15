import { createProduct, updateProduct } from '~/services/products'
import { getErrorMessage } from '~/services/api'

export const useProductEditor = () => {
    const { setFlash } = useFlash()
    const saving = ref(false)
    const errorMessage = ref('')
    const slugError = ref('')

    const save = async (action, successMessage) => {
        saving.value = true
        errorMessage.value = ''
        slugError.value = ''
        try {
            await action()
            setFlash('success', successMessage)
            await navigateTo('/products')
        } catch (error) {

            if (error?.data?.error?.code === 'SLUG_ALREADY_EXISTS') {
                slugError.value = getErrorMessage(error)
            } else {
                errorMessage.value = getErrorMessage(error)
            }
        } finally {
            saving.value = false
        }
    }

    const create = (payload) => save(() => createProduct(payload), `« ${payload.name} » a été créé.`)
    const update = (id, payload) => save(() => updateProduct(id, payload), `« ${payload.name} » a été mis à jour.`)

    return { saving, errorMessage, slugError, create, update }
}