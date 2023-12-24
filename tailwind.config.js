/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: '#f5f3f0',
                foreground: 'rgb(var(--foreground))',
                primary: {
                    DEFAULT: '#E7CB7F',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: '#F4DDA1',
                    subtitle: '#70798a',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                tertiary: {
                    DEFAULT: '#253C64',
                    subtitle: '#70798a',
                    foreground: '#ECF1F4' // === on tertiary color
                },
                surface: {
                    DEFAULT: '#F2C879',
                    tertiary: '#647389',
                    subtitle: '#D9D0C1',
                    foreground: '#3B4863' // === on surface color
                },
                success: { DEFAULT: '#2CB852' },
                text: {
                    DEFAULT: '#590202',
                    subtle: '#C7BBA9'
                },
                destructive: {
                    DEFAULT: '#C74048',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'rgb(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },

                // Custom colors
                mediumSilver: '#c7c7c7',
                lightSilver: '#ededed',
                mediumBlack: '#2e3133',
                darkGold: '#dbb778',
                lightGold: '#f0cf95',
                gold: {
                    DEFAULT: '#dbb658',
                    300: '#e2c479',
                    400: '#debd68',
                    500: '#dbb658',
                    600: '#c5a34f',
                    700: '#af9146'
                },

                // Primary brand color shades
                'harvest-gold': {
                    DEFAULT: '#E7CB7F',
                    50: '#F5EACC',
                    100: '#F4E7C4',
                    200: '#F1E0B3',
                    300: '#EDD9A1',
                    400: '#EAD290',
                    500: '#E7CB7F',
                    600: '#E3C26A',
                    700: '#DFBA54',
                    800: '#DBB13F',
                    900: '#D7A829',
                    950: '#CDA026'
                },

                // Secondary brand color shades
                'light-gold': {
                    DEFAULT: '#F4DDA1',
                    50: '#FEFBF3',
                    100: '#FDF7EA',
                    200: '#FAF1D8',
                    300: '#F8EAC6',
                    400: '#F6E4B3',
                    500: '#F4DDA1',
                    600: '#EFCC73',
                    700: '#E9BC46',
                    800: '#E2AA1A',
                    900: '#B48815',
                    950: '#9D7712'
                },

                // Tertiary brand color shades
                'dark-navy': {
                    DEFAULT: '#253C64',
                    50: '#96AED8',
                    100: '#8BA6D4',
                    200: '#7595CC',
                    300: '#5E83C4',
                    400: '#4872BB',
                    500: '#3E64A7',
                    600: '#365791',
                    700: '#2D497A',
                    800: '#253C64',
                    900: '#1B2C4A',
                    950: '#17253D'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            },
            fontFamily: {
                default: ['"Nunito Sans"', 'sans-serif'],
                primary: ['"Playfair Display"', 'serif']
            },
            backgroundSize: {
                'size-200': 'var(--size-200)'
            },
            backgroundPosition: {
                'pos-0': 'var(--pos-0)',
                'pos-100': 'var(--pos-100)'
            },
            backgroundImage: {
                'gradient-background':
                    'linear-gradient(150deg, #ffcc80 40%, #f57c00 90%)',
                'gradient-primary':
                    'linear-gradient(140deg, rgba(234,210,144,1) 60%, rgba(231,203,127,1) 75%, rgba(227,194,106,1) 96%)',
                'gradient-destructive':
                    'linear-gradient(135deg, rgba(255,65,34,1) 60%, rgba(237,53,26,1) 85%, rgba(198,26,9,1) 100%)',
                'gradient-active':
                    'linear-gradient(135deg, rgba(50,252,167,1) 60%, rgba(27,220,138,1) 85%, rgba(5,190,112,1) 100%)'
            },
            dropShadow: {
                primary: [
                    '0 10px 10px rgba(231,203,127, 0.4)',
                    '0 20px 20px rgba(231,203,127, 0.4)'
                ]
            },
            screens: {
                xs: '320px',
                sm: '425px',
                sml: '500px',
                md: '667px',
                mdl: '768px',
                xmdl: '890px',
                lg: '960px',
                lgl: '1024px',
                xl: '1280px',
                xxl: '1680px'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
};
