export const apiFetch = (path, options = {}) => {
    const { public: config } = useRuntimeConfig()
    return $fetch(path, { baseURL: config.apiBase, ...options })
}

// Pour les routes admin : ajoute le token à chaque requête
export const adminFetch = (path, options = {}) => {
    const { token } = useAuth()
    return apiFetch(path, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${token.value}` },
    })
}

export const getErrorMessage = (error) =>
    error?.data?.error?.message ?? 'Une erreur est survenue'