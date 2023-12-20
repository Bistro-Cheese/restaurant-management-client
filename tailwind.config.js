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
                background: 'hsl(var(--background))',
                foreground: 'rgb(var(--foreground))',
                primary: {
                    DEFAULT: '#ECCB86',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: '#F4DDA1',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                tertiary: {
                    DEFAULT: '#253C64',
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
                    DEFAULT: '#ECCB86',
                    50: '#FCF6E9',
                    100: '#FAF1DE',
                    200: '#F6E7C8',
                    300: '#F3DEB2',
                    400: '#EFD49C',
                    500: '#ECCB86',
                    600: '#E6BC63',
                    700: '#E1AD3F',
                    800: '#D69C22',
                    900: '#B3821C',
                    950: '#A17519'
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
                    50: '#CED9ED',
                    100: '#BFCEE7',
                    200: '#A1B7DC',
                    300: '#84A0D1',
                    400: '#6689C6',
                    500: '#4872BB',
                    600: '#3B60A0',
                    700: '#304E82',
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
                    'linear-gradient(140deg, rgba(225,196,144,1) 60%, rgba(219,183,120,1) 80%, rgba(215,174,104,1) 96%)',
                'gradient-destructive':
                    'linear-gradient(135deg, rgba(255,65,34,1) 60%, rgba(237,53,26,1) 85%, rgba(198,26,9,1) 100%)',
                'gradient-active':
                    'linear-gradient(135deg, rgba(50,252,167,1) 60%, rgba(27,220,138,1) 85%, rgba(5,190,112,1) 100%)'
            },
            dropShadow: {
                primary: [
                    '0 10px 10px rgba(219, 183, 120, 0.3)',
                    '0 20px 20px rgba(219, 183, 120, 0.3)'
                ]
            },
            screens: {
                xs: '320px',
                sm: '425px',
                sml: '500px',
                md: '667px',
                mdl: '769px',
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
