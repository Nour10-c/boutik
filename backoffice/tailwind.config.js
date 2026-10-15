export default {
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000',
            transparent: 'transparent',
            primary: {
                50: '#eef2ff',
                100: '#e0e7ff',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
            },
            secondary: {
                50: '#fffbeb',
                100: '#fef3c7',
                500: '#f59e0b',
                600: '#d97706',
                700: '#b45309',
            },
            neutral: {
                50: '#f8fafc',
                100: '#f1f5f9',
                200: '#e2e8f0',
                300: '#cbd5e1',
                500: '#64748b',
                700: '#334155',
                900: '#0f172a',
            },
            success: {
                50: '#f0fdf4',
                500: '#22c55e',
                700: '#15803d',
            },
            error: {
                50: '#fef2f2',
                500: '#ef4444',
                700: '#b91c1c',
            },
        },
        fontFamily: {
            sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1.25' }],
            sm: ['0.875rem', { lineHeight: '1.4' }],
            base: ['1rem', { lineHeight: '1.5' }],
            lg: ['1.125rem', { lineHeight: '1.5' }],
            xl: ['1.25rem', { lineHeight: '1.4' }],
            '2xl': ['1.5rem', { lineHeight: '1.3' }],
            '3xl': ['1.875rem', { lineHeight: '1.2' }],
        },
        borderRadius: {
            none: '0',
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            full: '9999px',
        },
        boxShadow: {
            none: 'none',
            sm: '0 1px 2px 0 rgb(15 23 42 / 0.06)',
            md: '0 4px 8px -2px rgb(15 23 42 / 0.1)',
            lg: '0 12px 24px -6px rgb(15 23 42 / 0.15)',
        },
    },
}