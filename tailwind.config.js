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
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
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
                mediumSilver: '#c7c7c7',
                lightSilver: '#ededed',
                mediumBlack: '#2e3133',
                darkGold: '#dbb778',
                lightGold: '#f0cf95',
                gold: {
                    300: '#e2c479',
                    400: '#debd68',
                    500: '#dbb658',
                    600: '#c5a34f',
                    700: '#af9146'
                },
                'harvest-gold': {
                    DEFAULT: '#DBB778',
                    50: '#F8F1E5',
                    100: '#F5EBD9',
                    200: '#EEDEC0',
                    300: '#E8D1A8',
                    400: '#E1C490',
                    500: '#DBB778',
                    600: '#D8B16C',
                    700: '#D5AA60',
                    800: '#D1A454',
                    900: '#CE9D48',
                    950: '#CD9A42'
                },
                navy: {
                    DEFAULT: '#111A2B',
                    50: '#2A4069',
                    100: '#283D65',
                    200: '#25395E',
                    300: '#223557',
                    400: '#1F3050',
                    500: '#1D2C48',
                    600: '#1A2741',
                    700: '#17233A',
                    800: '#141E32',
                    900: '#111A2B',
                    950: '#0D1422'
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
                    'linear-gradient(140deg, rgba(225,196,144,1) 60%, rgba(219,183,120,1) 80%, rgba(216,177,108,1) 96%)',
                'gradient-destructive':
                    'linear-gradient(135deg, rgba(255,65,34,1) 60%, rgba(237,53,26,1) 85%, rgba(198,26,9,1) 100%)',
                'gradient-active':
                    'linear-gradient(135deg, rgba(50,252,167,1) 60%, rgba(27,220,138,1) 85%, rgba(5,190,112,1) 100%)'
            },
            dropShadow: {
                primary: [
                    '0 15px 25px rgba(219,182,88, 0.45)',
                    '0 25px 35px rgba(226,196,121, 0.30)'
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
