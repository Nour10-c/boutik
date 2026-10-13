export const apiFetch = (path, options = {}) => {
    const { public: config } = useRuntimeConfig()
    return $fetch(path, { baseURL: config.apiBase, ...options })
}

export const getErrorMessage = (error) =>
    error?.data?.error?.message ?? 'Une erreur est survenue'