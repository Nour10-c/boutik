export default {
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000',
            transparent: 'transparent',
            primary: {
                50: '#f0f2f3',
                100: '#dde2e5',
                500: '#3b4a55',
                600: '#1f2d38',
                700: '#141e26',
            },
            secondary: {
                50: '#faf6ee',
                100: '#f2e8d3',
                500: '#b08d57',
                600: '#96763f',
                700: '#6f5628',
            },
            neutral: {
                50: '#f7f8f8',
                100: '#eef0f0',
                200: '#e1e4e5',
                300: '#c9ced0',
                500: '#6b7479',
                700: '#3a4247',
                900: '#14181b',
            },
            success: {
                50: '#eef5f0',
                500: '#3f8a5b',
                700: '#24603b',
            },
            error: {
                50: '#f8eeee',
                500: '#b4433f',
                700: '#8a2b28',
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
            sm: '0.125rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            full: '9999px',
        },
        boxShadow: {
            none: 'none',
            sm: '0 1px 2px 0 rgb(20 24 27 / 0.05)',
            md: '0 4px 12px -4px rgb(20 24 27 / 0.12)',
            lg: '0 12px 28px -8px rgb(20 24 27 / 0.18)',
        },
    },
}